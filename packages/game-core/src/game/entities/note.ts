import { Point2D } from "../../core/math/point2d";
import type { DrawContext, Renderable, Texture } from "../../engine/render-system";

/**
 * Game note
 */
export class Note implements Renderable {
    public position: Point2D = new Point2D()
    private texture: Texture;

    constructor(texture: Texture) {
        this.texture = texture;
    }

    render(ctx: DrawContext): void {
        ctx.drawSprite(this.texture, this.position.x, this.position.y, this.texture.getWidth(), this.texture.getHeight());
    }
}
