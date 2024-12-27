export interface SimplePoint2D {
    x: number;
    y: number;
}

export interface SimplePoint3D {
    x: number;
    y: number;
    z: number;
}

export function addSimplePoint2D(a: SimplePoint2D, b: SimplePoint2D): SimplePoint2D {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function addSimplePoint3D(a: SimplePoint3D, b: SimplePoint3D): SimplePoint3D {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function addSimplePoint2DWithWrapping(
    a: SimplePoint2D,
    b: SimplePoint2D,
    width: number,
    height: number,
): SimplePoint2D {
    return { x: (a.x + b.x + width) % width, y: (a.y + b.y + height) % height };
}

export function addSimplePoint3DWithWrapping(
    a: SimplePoint3D,
    b: SimplePoint3D,
    width: number,
    height: number,
    depth: number,
): SimplePoint3D {
    return { x: (a.x + b.x + width) % width, y: (a.y + b.y + height) % height, z: (a.z + b.z + depth) % depth };
}

export function subtractSimplePoint2DWithWrapping(
    a: SimplePoint2D,
    b: SimplePoint2D,
    width: number,
    height: number,
): SimplePoint2D {
    return { x: (a.x - b.x + width) % width, y: (a.y - b.y + height) % height };
}

export function subtractSimplePoint3DWithWrapping(
    a: SimplePoint3D,
    b: SimplePoint3D,
    width: number,
    height: number,
    depth: number,
): SimplePoint3D {
    return { x: (a.x - b.x + width) % width, y: (a.y - b.y + height) % height, z: (a.z - b.z + depth) % depth };
}

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

export class Velocity2D {
    public velocity: Point2D;

    constructor(velocity: Point2D) {
        this.velocity = velocity;
    }

    public manhattanLength(): number {
        return this.velocity.manhattanLength();
    }

    public manhattanLengthTo(other: Velocity2D): number {
        return this.velocity.manhattanLengthTo(other.velocity);
    }

    public equals(other: Velocity2D): boolean {
        return this.velocity.equals(other.velocity);
    }

    public clone(): Velocity2D {
        return new Velocity2D(this.velocity.clone());
    }

    public add(other: Velocity2D): Velocity2D {
        return new Velocity2D(this.velocity.add(other.velocity));
    }

    public subtract(other: Velocity2D): Velocity2D {
        return new Velocity2D(this.velocity.subtract(other.velocity));
    }

    public multiply(factor: number): Velocity2D {
        return new Velocity2D(this.velocity.multiply(factor));
    }

    public divide(divisor: number): Velocity2D {
        return new Velocity2D(this.velocity.divide(divisor));
    }

    public rotateRight(): Velocity2D {
        return new Velocity2D(this.velocity.rotateRight());
    }

    public rotateLeft(): Velocity2D {
        return new Velocity2D(this.velocity.rotateLeft());
    }

    public manhattanDistanceTo(other: Velocity2D): number {
        return this.velocity.manhattanDistanceTo(other.velocity);
    }
}
