import { lerp } from "./math";
import { Vector2D } from "./vector2d";

/**
 * 2D Point with X and Y coordinates.
 */
export class Point2D {
    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number { return this._x; }
    public set x(value: number) { this._x = value; }

    public get y(): number { return this._y; }
    public set y(value: number) { this._y = value; }

    public translated(by: Readonly<Vector2D>): Point2D {
        return new Point2D(this.x + by.x, this.y + by.y);
    }

    public vectorTo(other: Readonly<Point2D>): Vector2D {
        return new Vector2D(other.x - this.x, other.y - this.y);
    }

    public distanceTo(other: Readonly<Point2D>): number {
        const d = this.vectorTo(other);
        return d.length();
    }

    public lerp(other: Readonly<Point2D>, t: number): Point2D {
        const x = lerp(this.x, other.x, t);
        const y = lerp(this.y, other.y, t);

        return new Point2D(x, y);
    }
}
