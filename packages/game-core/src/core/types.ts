export interface DrawContext {
    drawText(
        text: string,
        x: number,
        y: number,
    ): void;
}

export interface Renderable {
    render(ctx: DrawContext): void
}