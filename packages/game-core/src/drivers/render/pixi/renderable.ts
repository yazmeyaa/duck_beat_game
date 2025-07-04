import { type Texture as PixiTexture } from "pixi.js";
import type { Texture } from "../../../engine/render-system";

/**
 * Game engine pixi texture
 */
export class EnginePixiTexture implements Texture<PixiTexture> {
    private pixiTexture: PixiTexture;
    private _isLoaded = false;

    constructor(texture: PixiTexture) {
        this.pixiTexture = texture;
    }
    getWidth(): number {
        return this.pixiTexture.width;
    }
    getHeight(): number {
        return this.pixiTexture.height;
    }
    getNativeTexture(): PixiTexture {
        return this.pixiTexture;
    }
    async load(): Promise<void> {
        // TODO: find the way to implement this.
        this._isLoaded = true;
    }
    destroy(): void {
        this.pixiTexture.destroy();
    }
    public isLoaded(): boolean {
        return this._isLoaded;
    }
}
