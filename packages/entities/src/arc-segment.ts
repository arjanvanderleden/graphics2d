import { Point } from './point';
import { Vector } from './vector';
import { Bounds } from './bounds';
import { Circle } from './circle';
import { EntityType, Graphics2DEntity } from './graphics-2d-entity';

export class ArcSegment extends Graphics2DEntity {
  readonly type = EntityType.arcSegment;
  // three point
  // two point, radius
  // center, radius, startAngle, endAngle
  // center, startPoint, angle

  constructor(
    public readonly center: Point,
    public readonly radius: number,
    public readonly startAngle: number,
    public readonly sweptAngle: number
  ) {
    super();
  }

  static minorMajorArc(center: Point, firstPoint: Point, secondPoint: Point) {
    const radius = center.distance(firstPoint);
    if (Math.abs(radius - center.distance(secondPoint)) > Number.EPSILON) {
      return undefined;
    }
    const angle =
      center.angleToPoint(firstPoint) - center.angleToPoint(secondPoint);
    const otherAngle = angle < 0 ? angle + 360 : angle - 360;

    return Math.abs(angle) > Math.abs(otherAngle)
      ? {
          minor: new ArcSegment(
            center,
            radius,
            center.angleToPoint(firstPoint),
            otherAngle
          ),
          major: new ArcSegment(
            center,
            radius,
            center.angleToPoint(firstPoint),
            angle
          ),
        }
      : {
          minor: new ArcSegment(
            center,
            radius,
            center.angleToPoint(firstPoint),
            angle
          ),
          major: new ArcSegment(
            center,
            radius,
            center.angleToPoint(firstPoint),
            otherAngle
          ),
        };
  }

  clone() {
    return new ArcSegment(
      this.center,
      this.radius,
      this.startAngle,
      this.sweptAngle
    );
  }

  startPoint() {
    return Point.createFromAngle(this.startAngle, this.radius).add(this.center);
  }

  endPoint() {
    return Point.createFromAngle(
      this.startAngle + this.sweptAngle,
      this.radius
    ).add(this.center);
  }

  offsetThrough(point: Point) {
    const newRadius = point.distance(this.center);
    return new ArcSegment(
      this.center,
      newRadius,
      this.startAngle,
      this.sweptAngle
    );
  }

  extendToAngle(newEndAngle: number) {
    return new ArcSegment(
      this.center,
      this.radius,
      this.startAngle,
      newEndAngle
    );
  }

  extendFromAngle(newStartAngle: number) {
    return new ArcSegment(
      this.center,
      this.radius,
      newStartAngle,
      this.sweptAngle
    );
  }

  moveTo(newCenter: Point) {
    return new ArcSegment(
      newCenter,
      this.radius,
      this.startAngle,
      this.sweptAngle
    );
  }

  moveBy(vector: Vector) {
    return new ArcSegment(
      this.center.add(vector),
      this.radius,
      this.startAngle,
      this.sweptAngle
    );
  }

  static createFromThreePoints(
    startPoint: Point,
    onArcPoint: Point,
    endPoint: Point
  ) {
    const { center, radius } =
      Circle.createFromThreePoints(startPoint, onArcPoint, endPoint) ?? {};
    if (center === undefined) {
      return undefined;
    }
    const aAngle = center.angleToPoint(startPoint);
    const cAngle = center.angleToPoint(endPoint);

    const bAngel = center.angleToPoint(onArcPoint);
    const { startAngle, endAngle } =
      aAngle - bAngel > cAngle
        ? { startAngle: aAngle, endAngle: cAngle }
        : { startAngle: cAngle, endAngle: aAngle };

    return new ArcSegment(center, radius!, startAngle, endAngle);
  }

  bounds() {
    return new Bounds(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.center.x + this.radius,
      this.center.y + this.radius
    );
  }
}
