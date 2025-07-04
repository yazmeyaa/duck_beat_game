import { Sprite, Text, TextStyle, type Container, type Renderer, type Texture as PixiTexture } from 'pixi.js'
import type { DrawContext, DrawTextOptions, SpriteDrawerOptions, Texture } from '../../../engine/render-system';

/**
 *
 */
export class PixiRenderingContext implements DrawContext {
    private pixiRenderer: Renderer;
    private sceneContainer: Container;

    constructor(renderer: Renderer, container: Container) {
        this.pixiRenderer = renderer;
        this.sceneContainer = container;
    }

    public drawText(text: string, x: number, y: number, options?: DrawTextOptions): void {
        const style = new TextStyle({
            fill: options?.color
                ? `rgba(${options.color.r},${options.color.g},${options.color.b},${options.color.alpha})`
                : '#ffffff',
            fontSize: options?.fontSize ?? 16,
            fontFamily: options?.fontFamily ?? 'Arial',
            fontStyle: options?.fontStyle === 'italic' ? 'italic' : 'normal',
            fontWeight: options?.fontStyle === 'bold' ? 'bold' : 'normal',
        });

        const textObject = new Text({
            text,
            ...style
        })
        textObject.x = x;
        textObject.y = y;
        this.sceneContainer.addChild(textObject);
    }

    public drawSprite(texture: Texture<PixiTexture>, x: number, y: number, dx: number, dy: number, options?: SpriteDrawerOptions): void {
        const native = texture.getNativeTexture();
        if (!native) throw new Error('Texture not loaded');

        const sprite = new Sprite(native as PixiTexture);
        sprite.x = x;
        sprite.y = y;
        sprite.width = dx;
        sprite.height = dy;
        sprite.alpha = options?.opacity ?? 1.0;

        this.sceneContainer.addChild(sprite);
    }

    public renderFrame(): void {
        this.sceneContainer.removeChildren();
        this.pixiRenderer.render(this.sceneContainer);
    }
}
