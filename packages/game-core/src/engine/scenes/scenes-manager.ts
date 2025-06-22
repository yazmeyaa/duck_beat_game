import type { SceneFactory, SceneManager } from "./manager";
import type { Scene } from "./scene";

/**
 * Scenes manger. Able to preload, switch and dispose scenes.
 */
export class GameScenesManager implements SceneManager {
    private _currentScene: Scene | null = null;
    private _scenes: Map<string, Scene> = new Map();

    async switchTo(name: string): Promise<void> {
        if (!this._scenes.has(name)) return;
        const next = this._scenes.get(name)!;

        this._currentScene?.onExit?.();

        next.init?.();
        next.onEnter?.();
        this._currentScene = next;
    }

    public getCurrent(): Scene {
        if (!this._currentScene) {
            throw new Error("Current scene is not defined yet!")
        }
        return this._currentScene;
    }

    private addScene(name: string, scene: Scene): void {
        this._scenes.set(name, scene);
    }

    public register(name: string, factory: SceneFactory): void {
        if (factory instanceof Promise) {
            factory.then(s => this.addScene(name, s));
            return;
        }
        this.addScene(name, factory);
    }
    
    public unload(name: string): void {
        if (!this._scenes.has(name)) return;
        const scene = this._scenes.get(name)!;
        scene.dispose?.()
        this._scenes.delete(name);
    }
}