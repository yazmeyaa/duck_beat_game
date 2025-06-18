export type OnKeyHandler = (key: string) => void;

export interface KeyboardSystem {
    isKeyPressed(key: string): boolean;
    update(): void;
    /**
     * Get list of pressed keys
     * @returns {string[]} list of pressed keys
     */
    getPressedKeys(): Iterable<string>;
    /**
     * Subscribe to keydown or keyup events
     * @param type 'down' | 'up'
     * @param handler callback function
     */
    on(type: 'down' | 'up', handler: OnKeyHandler): void;
    /**
     * Remove previously registered event handler
     */
    off(type: 'down' | 'up', handler: OnKeyHandler): void;
}