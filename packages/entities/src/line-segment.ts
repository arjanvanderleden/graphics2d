import { Point } from './point';
import { ArcSegment } from './arc-segment';
import { LineSegmentExtendMode, PointLike, Vector } from './index';
import { Bounds } from './bounds';
import { EntityType, Graphics2DEntity } from './graphics-2d-entity';

export class LineSegment extends Graphics2DEntity {
  readonly type = EntityType.lineSegment;
  readonly firstPoint: Point;
  readonly secondPoint: Point;

  static createByGradientThroughPoint(
    point: Point,
    gradient: number,
    length: number
  ) {
    const supportPoint = new Point(-1, gradient).add(point);
    const supportLine = new LineSegment(point, supportPoint);
    return supportLine.extendToLength(length, LineSegmentExtendMode.fromFirst);
  }

  constructor(firstPoint: PointLike, secondPoint: PointLike) {
    super();
    this.firstPoint = Point.create(firstPoint);
    this.secondPoint = Point.create(secondPoint);
  }

  clone() {
    return new LineSegment(this.firstPoint.clone(), this.secondPoint.clone());
  }

  extendToLength(newLength: number, extendMode: LineSegmentExtendMode) {
    const [basePoint, otherPoint] =
      extendMode === LineSegmentExtendMode.fromFirst
        ? [this.firstPoint, this.secondPoint]
        : [this.secondPoint, this.firstPoint];
    const factor = newLength / this.length();
    const endPoint = otherPoint.scaleRelativeTo(basePoint, factor);
    return new LineSegment(basePoint, endPoint);
  }

  length() {
    const length = this.firstPoint.distance(this.secondPoint);
    return length;
  }

  override valueOf() {
    return [
      { x: this.firstPoint.x, y: this.firstPoint.y },
      { x: this.secondPoint.x, y: this.secondPoint.y },
    ];
  }

  invert() {
    return new LineSegment(this.secondPoint, this.firstPoint);
  }

  moveToPoint(point: PointLike) {
    return new LineSegment(
      point,
      this.secondPoint.subtract(this.firstPoint).add(point)
    );
  }

  gradientIntercept() {
    const { x: x0, y: y0 } = this.firstPoint;
    const { x: x1, y: y1 } = this.secondPoint;

    if (Math.abs(x1 - x0) < Number.EPSILON) {
      return { gradient: Number.POSITIVE_INFINITY, intercept: Number.NaN };
    }

    const gradient = (y1 - y0) / (x1 - x0);
    const intercept = (x1 * y0 - x0 * y1) / (x1 - x0);
    return { gradient, intercept };
  }

  isParallelTo(otherLine: LineSegment) {
    const gradient = this.gradientIntercept().gradient;
    const otherGradient = otherLine.gradientIntercept().gradient;
    return Math.abs(gradient) === Math.abs(otherGradient);
  }

  intersect(otherLine: LineSegment) {
    if (this.isParallelTo(otherLine)) {
      return undefined;
    }
    const { gradient: a, intercept: b } = this.gradientIntercept();
    const { gradient: c, intercept: d } = otherLine.gradientIntercept();
    const x = (d - b) / (a - c);
    const y = a * x + b;
    return new Point(x, y);
  }

  createPerpendicularFrom(fromPoint: PointLike) {
    const { gradient } = this.gradientIntercept();
    if (gradient === Number.POSITIVE_INFINITY) {
      return new LineSegment(
        fromPoint,
        new Point(this.firstPoint.x, fromPoint.y)
      );
    }
    if (gradient === 0) {
      return new LineSegment(
        fromPoint,
        new Point(fromPoint.x, this.firstPoint.y)
      );
    }
    const supportLine = LineSegment.createByGradientThroughPoint(
      Point.create(fromPoint),
      1 / gradient,
      1
    );
    return new LineSegment(fromPoint, this.intersect(supportLine)!);
  }

  offset(distance: number, somePointOnOffsetSide: PointLike) {
    const supportLine = this.createPerpendicularFrom(somePointOnOffsetSide)
      .invert()
      .moveToPoint(this.firstPoint)
      .extendToLength(distance, LineSegmentExtendMode.fromFirst);
    return this.moveToPoint(supportLine.secondPoint);
  }

  midPoint() {
    return new Point(
      (this.firstPoint.x + this.secondPoint.x) / 2,
      (this.firstPoint.y + this.secondPoint.y) / 2
    );
  }

  moveBy(vector: Vector) {
    return new LineSegment(
      this.firstPoint.add(vector),
      this.secondPoint.add(vector)
    );
  }

  rotate(aroundPoint: PointLike, angle: number) {
    return new LineSegment(
      this.firstPoint.rotate(aroundPoint, angle),
      this.secondPoint.rotate(aroundPoint, angle)
    );
  }

  bySect() {
    return this.rotate(this.midPoint(), 90);
  }

  fillet(otherLine: LineSegment, radius: number) {
    const pointOnInside = new LineSegment(
      this.midPoint(),
      otherLine.midPoint()
    ).midPoint();
    const offsetLine = this.offset(radius, pointOnInside);
    const otherOffsetLine = otherLine.offset(radius, pointOnInside);
    const center = offsetLine.intersect(otherOffsetLine);
    if (center === undefined) {
      return undefined;
    }
    const p1 = this.createPerpendicularFrom(center).secondPoint;
    const p2 = otherLine.createPerpendicularFrom(center).secondPoint;
    const a1 = center.angleToPoint(p1);
    const a2 = center.angleToPoint(p2);
    return new ArcSegment(center, radius, a1, a2);
  }

  bounds() {
    return new Bounds(
      Math.min(this.firstPoint.x, this.secondPoint.x),
      Math.min(this.firstPoint.y, this.secondPoint.y),
      Math.max(this.firstPoint.x, this.secondPoint.x),
      Math.max(this.firstPoint.y, this.secondPoint.y)
    );
  }

  weightedPointBetween(firstWeight: number, secondWeight: number) {
    return this.extendToLength(
      (firstWeight / (firstWeight + secondWeight)) * this.length(),
      LineSegmentExtendMode.fromFirst
    ).secondPoint;
  }

  perpendicularBisector() {
    return this.rotate(this.midPoint(), 90);
  }
}
