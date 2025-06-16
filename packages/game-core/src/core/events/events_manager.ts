/**
 * Events manger.
 * Able to listen and produce events with payload
 */
export class EventManager<EventMap extends Record<string, unknown> = Record<string, unknown>> {
    private _handlers: { [K in keyof EventMap]?: ((payload: EventMap[K]) => void)[] } = {};

    public produce<K extends keyof EventMap>(key: K, payload: EventMap[K]): void {
        const handlers = this._handlers[key];
        if (!handlers) return;
        const copy = handlers.slice();
        for (const handler of copy) {
            handler(payload);
        }
    }

    public addEventListener<K extends keyof EventMap>(key: K, handler: (payload: EventMap[K]) => void): void {
        if (!this._handlers[key]) {
            this._handlers[key] = [];
        }
        this._handlers[key]!.push(handler);
    }

    public removeEventListener<K extends keyof EventMap>(key: K, handler: (payload: EventMap[K]) => void): void {
        const handlers = this._handlers[key];
        if (!handlers) return;
        const idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1);
    }
}
