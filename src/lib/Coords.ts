export class Point2D {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public manhattanDistanceTo(other: Point2D): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    public add(other: Point2D): Point2D {
        return new Point2D(this.x + other.x, this.y + other.y);
    }

    public subtract(other: Point2D): Point2D {
        return new Point2D(this.x - other.x, this.y - other.y);
    }

    public multiply(factor: number): Point2D {
        return new Point2D(this.x * factor, this.y * factor);
    }

    public divide(divisor: number): Point2D {
        return new Point2D(this.x / divisor, this.y / divisor);
    }

    public rotateRight(): Point2D {
        return new Point2D(this.y, -this.x);
    }

    public rotateLeft(): Point2D {
        return new Point2D(-this.y, this.x);
    }

    public manhattanLength(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    public manhattanLengthTo(other: Point2D): number {
        return this.subtract(other).manhattanLength();
    }

    public equals(other: Point2D): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public clone(): Point2D {
        return new Point2D(this.x, this.y);
    }
}

export class Point3D {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public manhattanDistanceTo(other: Point3D): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z);
    }

    public add(other: Point3D): Point3D {
        return new Point3D(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    public subtract(other: Point3D): Point3D {
        return new Point3D(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    public multiply(factor: number): Point3D {
        return new Point3D(this.x * factor, this.y * factor, this.z * factor);
    }

    public divide(divisor: number): Point3D {
        return new Point3D(this.x / divisor, this.y / divisor, this.z / divisor);
    }

    public manhattanLength(): number {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    public manhattanLengthTo(other: Point3D): number {
        return this.subtract(other).manhattanLength();
    }

    public equals(other: Point3D): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    public clone(): Point3D {
        return new Point3D(this.x, this.y, this.z);
    }
}
