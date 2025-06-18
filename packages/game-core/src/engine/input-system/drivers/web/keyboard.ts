import type { KeyboardSystem, OnKeyHandler } from "../../keyboard";

/**
 * WEB KeyboardSystem implementation
 */
export class WebKeyboardSystem implements KeyboardSystem {
    private upHandlers = new Set<OnKeyHandler>();
    private downHandlers = new Set<OnKeyHandler>();
    private readonly keyStates = new Set<string>();

    constructor() {
        window.addEventListener('keydown', (event) => {
            this.keyStates.add(event.code);
            for (const h of this.downHandlers) {
                h(event.code);
            }
        })
        window.addEventListener('keyup', (event) => {
            this.keyStates.delete(event.code);
            for (const h of this.upHandlers) {
                h(event.code);
            }
        })
    }
    public on(type: "down" | "up", handler: OnKeyHandler): void {
        if (type === 'up') this.upHandlers.add(handler);
        if (type === 'down') this.downHandlers.add(handler);
    }

    public off(type: "down" | "up", handler: OnKeyHandler): void {
        if (type === 'up') this.upHandlers.delete(handler);
        if (type === 'down') this.downHandlers.delete(handler);
    }

    public getPressedKeys(): Iterable<string> {
        return this.keyStates.values();
    }

    /**
     * Check if key is pressed
     * @param {string} key  key code
     * @returns {boolean} true if key is pressed
     */
    public isKeyPressed(key: string): boolean {
        return this.keyStates.has(key);
    }

    /**
     * Update keyboard state
     * @returns {void} nothing.
     * @throws there is no errors expected.
     */

    // eslint-disable-next-line class-methods-use-this -- at this moment i dont need to make some updates here. maybe in WEB it does not need... 
    public update(): void { }

}