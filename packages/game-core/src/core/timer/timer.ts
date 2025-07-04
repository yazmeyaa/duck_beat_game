/**
 * Casual timer implementation
 */
export class Timer {
    private _last: number | null = null;
    private _elapsedTime: number = 0;
    private _isPaused: boolean = true;
    private _delta: number = 0

    public update(dt: number): void {
        if (this.isPaused()) return;

        this._last = this._elapsedTime;
        this._elapsedTime += dt;
        this._delta = this._elapsedTime - this._last;
    }
    public reset(): void {
        this._last = null;
        this._elapsedTime = 0;
    }
    public pause(): void {
        this._isPaused = true;
    }
    public resume(): void {
        this._isPaused = false;
    }
    public isPaused(): boolean {
        return this._isPaused;
    }

    public getDelta(): number {
        return this._delta;
    }
    public getElapsed(): number {
        return this._elapsedTime;
    }

    public stop(): void {
        this.reset();
        this.pause();
    }

    public start(): void {
        this.reset();
        this.resume();
    }
}