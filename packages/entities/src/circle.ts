import { PointLike } from './index';
import { Bounds } from './bounds';
import { LineSegmentExtendMode } from './extend-mode';
import { Graphics2DEntity, EntityType } from './graphics-2d-entity';
import { LineSegment } from './line-segment';
import { Point } from './point';
import { Vector } from './vector';

export class Circle extends Graphics2DEntity {
  clone(): Graphics2DEntity {
    return new Circle(this.center, this.radius);
  }
  readonly type = EntityType.circle;
  readonly center: Point;
  constructor(center: PointLike, public readonly radius: number) {
    super();
    this.center = new Point(center.x, center.y);
  }

  static createFromThreePoints(
    startPoint: Point,
    onArcPoint: Point,
    endPoint: Point
  ) {
    const line1 = new LineSegment(startPoint, onArcPoint).bySect();
    const line2 = new LineSegment(onArcPoint, endPoint).bySect();
    if (line1.isParallelTo(line2)) {
      return undefined;
    }
    const center = line1.intersect(line2)!;
    const radius = center.distance(startPoint);
    return new Circle(center, radius);
  }

  offset(distance: number, pointOnSide: PointLike) {
    const isOutside = this.center.distance(pointOnSide) > this.radius;
    switch (true) {
      case isOutside:
        return new Circle(this.center, this.radius + distance);
      case distance < this.radius:
        return new Circle(this.center, this.radius - distance);
      default:
        return undefined;
    }
  }

  moveBy(vector: Vector) {
    return new Circle(this.center.add(vector), this.radius);
  }

  moveTo(point: PointLike) {
    return new Circle(point, this.radius);
  }

  scale(factor: number) {
    return new Circle(this.center, this.radius * factor);
  }

  bounds() {
    return new Bounds(
      this.center.x - this.radius,
      this.center.y - this.radius,
      this.center.x + this.radius,
      this.center.y + this.radius
    );
  }

  intersectWithLineSegment(line: LineSegment) {
    const perpendicularLine = line.createPerpendicularFrom(this.center);
    const perpendicularLength = perpendicularLine.length();
    const dif = perpendicularLine.length() - this.radius;
    // miss
    if (dif > Number.EPSILON) {
      return {
        points: [],
        lineSegments: [],
        arcSegments: [],
      };
    }
    // tangent
    if (Math.abs(dif) < Number.EPSILON) {
      return {
        points: [perpendicularLine.secondPoint],
        lineSegments: [
          new LineSegment(line.firstPoint, perpendicularLine.secondPoint),
          new LineSegment(perpendicularLine.secondPoint, line.secondPoint),
        ],
        arcSegments: [],
      };
    }
    const halfSecantLength = Math.sqrt(
      this.radius * this.radius - perpendicularLength * perpendicularLength
    );
    const lineSegment = new LineSegment(
      perpendicularLine.secondPoint,
      line.firstPoint
    )
      .extendToLength(halfSecantLength, LineSegmentExtendMode.fromFirst)
      .extendToLength(2 * halfSecantLength, LineSegmentExtendMode.fromSecond);
    return {
      points: [lineSegment.firstPoint, lineSegment.secondPoint],
      lineSegments: [
        new LineSegment(line.firstPoint, lineSegment.secondPoint),
        lineSegment,
        new LineSegment(lineSegment.firstPoint, line.secondPoint),
      ],
      arcSegments: [],
    };
  }

  intersectWithCircle(otherCircle: Circle) {
    const distance = this.center.distance(otherCircle.center);
    const dif = distance - this.radius - otherCircle.radius;
    if (dif > Number.EPSILON) {
      return [];
    }
    const centerToCenterLine = new LineSegment(this.center, otherCircle.center);
    if (Math.abs(dif) < Number.EPSILON) {
      const point = centerToCenterLine.extendToLength(
        this.radius,
        LineSegmentExtendMode.fromFirst
      ).secondPoint;
      return [point];
    }
    const secantMidpoint = centerToCenterLine.weightedPointBetween(
      this.radius,
      otherCircle.radius
    );
    const secantLine = centerToCenterLine.rotate(secantMidpoint, 90);
    const { points } = this.intersectWithLineSegment(secantLine);
    return points;
  }

  tangentFromPoint(point: Point) {
    const distance = point.distance(this.center);
    if (this.radius - distance > Number.EPSILON) {
      return [];
    }
    if (Math.abs(this.radius - distance) < Number.EPSILON) {
      const radial = this.radialPointingTo(point).extendToLength(
        2 * this.radius,
        LineSegmentExtendMode.fromFirst
      );
      const tangent = radial.rotate(radial.midPoint(), 90);
      return [tangent];
    }

    const centerLine = new LineSegment(this.center, point);
    const circle = new Circle(centerLine.midPoint(), centerLine.length() / 2);
    const points = this.intersectWithCircle(circle);
    return [
      new LineSegment(point, points[0]),
      new LineSegment(point, points[1]),
    ];
  }

  radialPointingTo(point: Point) {
    return new LineSegment(this.center, point).extendToLength(
      this.radius,
      LineSegmentExtendMode.fromFirst
    );
  }
}
