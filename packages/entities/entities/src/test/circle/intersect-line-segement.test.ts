import { Circle, LineSegment, Point } from '../../lib';

describe('Circle line segment intersect', () => {
  it('returns two point for a line that cuts the circle', () => {
    const line = new LineSegment(new Point(-100, 40), new Point(100, 40));
    const circle = new Circle(Point.origin, 50);
    const { points, arcSegments, lineSegments } =
      circle.intersectWithLineSegement(line);
    const [firstPoint, secondPoint] = points;

    expect(firstPoint).toBeDefined();
    expect(secondPoint).toBeDefined();

    expect(lineSegments.length).toBe(3);
    expect(Array.isArray(arcSegments)).toBe(true);
  });

  it('returns one point for a line that is tangent to the circle', () => {
    const line = new LineSegment(new Point(-100, 50), new Point(100, 50));
    const circle = new Circle(Point.origin, 50);
    const { points, lineSegments } = circle.intersectWithLineSegement(line);
    const [firstPoint, secondPoint] = points;

    expect(firstPoint).toBeDefined();
    expect(secondPoint).toBeUndefined();

    expect(lineSegments.length).toBe(2);
  });

  it('returns no point for a line that misses the circle', () => {
    const line = new LineSegment(new Point(-100, 60), new Point(100, 60));
    const circle = new Circle(Point.origin, 50);
    const { points, lineSegments } = circle.intersectWithLineSegement(line);
    const [firstPoint, secondPoint] = points;

    expect(firstPoint).toBeUndefined();
    expect(secondPoint).toBeUndefined();

    expect(lineSegments.length).toBe(0);
  });
});
