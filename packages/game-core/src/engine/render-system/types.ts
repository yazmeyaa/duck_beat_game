import type { Point2D } from "../../core/math/point2d";

export type RGBAColor = {
    r: number;
    g: number;
    b: number;
    alpha: number;
}

export interface Texture<T = unknown> {
    getWidth(): number;
    getHeight(): number;
    getNativeTexture(): T;
    load(): Promise<void>;
    destroy(): void;
    isLoaded(): boolean
}

export interface TextDrawer {
    drawText(text: string, x: number, y: number, options?: DrawTextOptions): void;
}

export type DrawTextOptions = {
    color?: RGBAColor;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: 'bold' | 'italic' | 'regular'
};


export type SpriteDrawerOptions = {
    opacity: number;
}

export interface SpriteDrawer {
    drawSprite(texture: Texture, x: number, y: number, dx: number, dy: number, options?: SpriteDrawerOptions): void;
}

export interface DrawContext extends
    TextDrawer,
    SpriteDrawer { }

export interface Renderable {
    render(ctx: DrawContext): void
}

export interface RenderableNode extends Renderable {
    children?: Renderable[];
    position: Point2D;
    rotation: number;
    scale: number;
}

export interface RenderSystem {
    renderNode(node: RenderableNode): void;
    init(): Promise<void>
}