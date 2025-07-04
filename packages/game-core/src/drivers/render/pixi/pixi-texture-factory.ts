import type { Texture } from "../../../engine/render-system";
import type { TextureFactory } from "../../resources/web/resource-manager";
import { Texture as PixiTexture } from 'pixi.js'
import { EnginePixiTexture } from "./renderable";

/**
 *
 */
export class PixiTextureFactory implements TextureFactory {
    // eslint-disable-next-line class-methods-use-this -- interface implementation.
    createFrom(bitmap: ImageBitmap): Texture<PixiTexture> {
        const baseTexture = PixiTexture.from(bitmap);
        const pixiTexture = new PixiTexture(baseTexture);
        return new EnginePixiTexture(pixiTexture);
    }
}