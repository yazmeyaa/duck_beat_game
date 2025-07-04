import type { Game } from "../..";
import { Point2D } from "../../../core/math/point2d";
import type { Renderable, RenderableNode, DrawContext, Texture } from "../../../engine/render-system";
import type { Scene } from "../../../engine/scenes";

// Пример текстуры (предполагаем, что она предоставляется Game)
interface GameTexture extends Texture {
    getWidth(): number;
    getHeight(): number;
    getNativeTexture(): unknown;
    load(): Promise<void>;
    destroy(): void;
    isLoaded(): boolean;
}

/**
 * Класс для ноты как Renderable
 */
class Note implements Renderable {
    private position: Point2D;
    private texture: GameTexture;
    private hitTime: number;
    private speed: number = 200;

    constructor(texture: GameTexture, hitTime: number, startX: number) {
        this.texture = texture;
        this.hitTime = hitTime;
        this.position = new Point2D(startX, -50);
    }

    render(ctx: DrawContext): void {
        ctx.drawSprite(this.texture, this.position.x, this.position.y, this.texture.getWidth(), this.texture.getHeight(), { opacity: 1 });
    }

    update(dt: number): void {
        this.hitTime = dt;
        // eslint-disable-next-line no-console -- let me do it ffs
        console.log(this.hitTime);
        this.position.y += this.speed * (dt / 1000);
    }

    isExpired(): boolean {
        return this.position.y > 600;
    }

    getPosition(): Point2D {
        return this.position;
    }
}

/**
 *  Класс для текста счета
 */
class ScoreText implements Renderable {
    private score: number;
    private position: Point2D;

    constructor() {
        this.score = 0;
        this.position = new Point2D(10, 10);
    }

    render(ctx: DrawContext): void {
        ctx.drawText(`Score: ${this.score}`, this.position.x, this.position.y, {
            color: { r: 255, g: 255, b: 255, alpha: 1 },
            fontSize: 24,
            fontFamily: "Arial",
        });
    }

    addScore(points: number): void {
        this.score += points;
    }
}

/**
 * Scene where player will hit the notes by beat
 */
export class PlayTrackScene implements Scene {
    private renderables: RenderableNode[] = [];
    private notes: Note[] = [];
    private scoreText: ScoreText | null = null;
    private game: Game | null = null;
    private currentTime: number = 0;

    async init(game: Game): Promise<void> {
        this.game = game;

        const { resource: noteTexture } = this.game.resources.getResource<Texture>("note");
        const { resource: backgroundTexture } = this.game.resources.getResource<Texture>("background");

        const background: Renderable = {
            render(ctx: DrawContext) {
                ctx.drawSprite(backgroundTexture, 0, 0, backgroundTexture.getWidth(), backgroundTexture.getHeight(), { opacity: 1 });
            },
        };
        this.renderables.push({
            position: new Point2D(0, 0),
            rotation: 0,
            scale: 1,
            children: [background],
            render(ctx) {
                ctx.drawSprite(backgroundTexture, 0, 0, 255, 255)
            },
        });

        this.scoreText = new ScoreText();
        this.renderables.push({
            position: new Point2D(),
            rotation: 0,
            scale: 1,
            children: [this.scoreText],
            render(ctx) {
                ctx.drawText("note!!", 0, 0)
            },
        });

        this.createNote(noteTexture, 1000, 100);
        this.createNote(noteTexture, 2000, 200);
    }

    private createNote(texture: GameTexture, hitTime: number, x: number): void {
        const note = new Note(texture, hitTime, x);
        this.notes.push(note);
        this.renderables.push({
            position: note.getPosition(),
            rotation: 0,
            scale: 1,
            children: [note],
            render(ctx) {
                const pos = note.getPosition();
                ctx.drawText("note!!", pos.x, pos.y)
            },
        });
    }

    update(dt: number): void {
        this.currentTime += dt;

        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.update(dt);
            if (note.isExpired()) {
                this.notes.splice(i, 1);
                const nodeIndex = this.renderables.findIndex((node) => node.children?.includes(note));
                if (nodeIndex !== -1) {
                    this.renderables.splice(nodeIndex, 1);
                }
            }
        }

        if (this.scoreText && this.currentTime > 1000 && this.notes.some((note) => Math.abs(note.getPosition().y - 500) < 10)) {
            this.scoreText.addScore(100);
        }
    }

    getRenderables(): ReadonlyArray<RenderableNode> {
        return this.renderables;
    }

    onEnter?(): void {
        this.currentTime = 0;
    }

    onExit?(): void {
        this.dispose();
    }

    dispose(): void {
        this.renderables = [];
        this.notes = [];
        this.scoreText = null;
        this.game = null;
    }
}