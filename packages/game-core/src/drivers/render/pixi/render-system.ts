import * as PIXI from 'pixi.js';
import type { RenderableNode, RenderSystem } from '../../../engine/render-system';
import { PixiRenderingContext } from './context';

/**
 *
 */
export class PixiRenderSystem implements RenderSystem {
    private app: PIXI.Application | null = null;
    private rootContainer: PIXI.Container | null = null;
    private drawContext: PixiRenderingContext | null = null;
    private targetElement: HTMLCanvasElement;

    constructor(targetElement: HTMLCanvasElement) {
        this.targetElement = targetElement;
    }

    public async init() {
        this.app = new PIXI.Application();
        await this.app.init({
            width: this.targetElement.clientWidth,
            height: this.targetElement.clientHeight,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            resizeTo: this.targetElement,
            canvas: this.targetElement,
        })

        this.rootContainer = new PIXI.Container();
        this.app.stage.addChild(this.rootContainer);
        this.drawContext = new PixiRenderingContext(this.app.renderer, this.rootContainer);
    }

    renderNode(node: RenderableNode): void {
        if (!this.rootContainer || !this.app) return;
        const nodeContainer = new PIXI.Container();
        nodeContainer.x = node.position.x;
        nodeContainer.y = node.position.y;
        nodeContainer.rotation = node.rotation;
        nodeContainer.scale.set(node.scale);

        this.rootContainer.addChild(nodeContainer);
        this.drawContext = new PixiRenderingContext(this.app.renderer, nodeContainer);

        node.render(this.drawContext);

        if (node.children) {
            node.children.forEach((child) => {
                this.renderNode(child as RenderableNode);
            });
        }

        this.drawContext.renderFrame();
    }

    destroy(): void {
        if (!this.app) return;
        this.app.destroy(true, {
            children: true,
            texture: true,
        });
    }
}