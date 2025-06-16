/**
 * Casual 2D vector implementation
 */
export class Vector2D {
    private _x: number;
    private _y: number;

    public get x(): number { return this._x; }
    public set x(value: number) { this._x = value; }

    public get y(): number { return this._y; }
    public set y(value: number) { this._y = value; }

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}