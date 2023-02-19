import { EntityType } from './graphics-2d-entity';
import { PointLike } from '../src';
import { Vector } from './vector';

export class Point extends Vector {
  override readonly type = EntityType.point;

  static readonly origin = new Point(0, 0);

  public constructor(x: number, y: number) {
    super(x, y);
  }

  static override create({ x, y }: PointLike) {
    return new Point(x, y);
  }

  static createFromAngle(angle: number, length: number) {
    return new Point(
      length * Math.cos((angle / 180) * Math.PI),
      length * Math.sin((angle / 180) * Math.PI)
    );
  }

  override add(v: PointLike) {
    return new Point(this.x + v.x, this.y + v.y);
  }

  override subtract(v: PointLike) {
    return new Point(this.x - v.x, this.y - v.y);
  }

  snapTo(gridX: number, gridY: number): Point {
    const x = Math.round(this.x / gridX) * gridX;
    const y = Math.round(this.y / gridY) * gridY;
    return new Point(x, y);
  }

  scale(factor: number): Point {
    return new Point(this.x * factor, this.y * factor);
  }

  scaleRelativeTo(point: Point, factor: number): Point {
    return this.subtract(point).scale(factor).add(point);
  }

  override clone(): Point {
    return new Point(this.x, this.y);
  }

  distance(point: PointLike): number {
    return Math.sqrt(
      (this.x - point.x) * (this.x - point.x) +
        (this.y - point.y) * (this.y - point.y)
    );
  }

  override toString() {
    return `${this.x},${this.y}`;
  }

  rotateAroundOrigin(angle: number) {
    const x =
      this.x * Math.cos((angle * Math.PI) / 180) -
      this.y * Math.sin((angle * Math.PI) / 180);
    const y =
      this.x * Math.sin((angle * Math.PI) / 180) +
      this.y * Math.cos((angle * Math.PI) / 180);
    return new Point(x, y);
  }

  rotate(aroundPoint: PointLike, angle: number) {
    return this.subtract(aroundPoint)
      .rotateAroundOrigin(angle)
      .add(aroundPoint);
  }

  angleToPoint(otherPoint: PointLike) {
    return Point.create(otherPoint).subtract(this).angle();
  }

  rotate90() {
    return new Point(-this.y, this.x);
  }

  rotate180() {
    return new Point(-this.x, -this.y);
  }

  rotate270() {
    return new Point(this.y, -this.x);
  }
}
