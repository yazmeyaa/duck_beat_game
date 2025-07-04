export enum ResourceType {
    Texture = 'texture',
    Audio = 'audio',
    Image = 'image'
}

export type Resource<T = unknown> = {
    type: ResourceType;
    resource: T
}

export type ResourceDescriptor = {
    key: string;
    type: ResourceType;
    path: string;
};

/**
 *  Resource manager
 */
export interface ResourceManager {
    register(descriptor: ResourceDescriptor): void;
    registerList(descriptors: ResourceDescriptor[]): void;
    getResource<T = unknown>(key: string): Resource<T>;
    loadAll(): Promise<Resource[]>;
    loadList(keys: string[]): Promise<Resource[]>
    load(key: string): Promise<Resource>;
    unloadList(keys: string[]): void;
    unload(key: string): void;
}
