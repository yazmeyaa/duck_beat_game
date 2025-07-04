import type { Texture } from "../../../engine/render-system";
import { type Resource, type ResourceDescriptor, type ResourceManager, ResourceType } from "../../../engine/resources";

export interface TextureFactory {
    createFrom(source: unknown): Texture;
}


/**
 * Resource Manager web implementation
 */
export class WebResourceManager implements ResourceManager {
    private descriptors: Map<string, ResourceDescriptor> = new Map();
    private resources: Map<string, Resource> = new Map();
    private audioCtx: AudioContext;
    private textureFactory: TextureFactory;

    constructor(ctx: AudioContext, textureFactory: TextureFactory) {
        this.audioCtx = ctx;
        this.textureFactory = textureFactory;
    }

    register(descriptor: ResourceDescriptor): void {
        this.descriptors.set(descriptor.key, descriptor);
    }
    registerList(descriptors: ResourceDescriptor[]): void {
        for (const descriptor of descriptors) {
            this.register(descriptor);
        }
    }
    getResource<T = unknown>(key: string): Resource<T> {
        const res = this.resources.get(key);
        if (!res) {
            const descriptor = this.descriptors.get(key);
            if (!descriptor) {
                throw new Error(`Cannot find resource ${key}.`)
            } else {
                throw new Error(`Resource "${key}" is registred, but not loaded. Use WebResourceManger.load("${key}") to load resource.`)
            }
        }
        return res as Resource<T>;
    }
    async loadAll(): Promise<Resource[]> {
        const promises: Promise<Resource>[] = [];
        for (const descriptor of this.descriptors.values()) {
            const promise = this.load(descriptor.key);
            promises.push(promise);
        }

        return Promise.all(promises);
    }

    async loadList(keys: string[]): Promise<Resource[]> {
        return Promise.all(keys.map((key) => this.load(key)))
    }

    private static async processAudio(response: Response, ctx: AudioContext): Promise<AudioBuffer> {
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        return audioBuffer;
    }

    private static async createImageElement(blob: Blob): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    private static async processImage(response: Response): Promise<ImageBitmap> {
        const blob = await response.blob();
        const image = await WebResourceManager.createImageElement(blob);
        return createImageBitmap(image)
    }

    async load(key: string): Promise<Resource> {
        const descriptor = this.descriptors.get(key);
        if (!descriptor) throw new Error("Missed descriptor. Maybe forget to register resource? (ResourceManager.register(descriptor: ResourceDescriptor)")
        const response = await fetch(descriptor.path);
        const resource: Resource = {
            type: descriptor.type,
        } as Resource;
        switch (descriptor.type) {
            case ResourceType.Audio:
                resource.resource = await WebResourceManager.processAudio(response, this.audioCtx);
                break;
            case ResourceType.Image:
                resource.resource = await WebResourceManager.processImage(response)
                break
            case ResourceType.Texture:
                
                resource.resource = this.textureFactory.createFrom(await WebResourceManager.processImage(response))
                break;
            default:
                throw new Error("Unexpected resource type.")
        }

        this.resources.set(key, resource);
        return resource;
    }
    unloadList(keys: string[]): void {
        for (const key of keys) {
            this.unload(key);
        }
    }
    unload(key: string): void {
        this.resources.delete(key);
    }
}