import { LineSegment, Point } from "../../../src";

describe('line.intersect', () => {
  it('intersects two lines', () => {
    const line1 = new LineSegment(new Point(1,3), new Point(3,7));
    const line2 = new LineSegment(new Point(0,8), new Point(4,2));
    expect(line1.intersect(line2)!.x).toBe(2);
    expect(line1.intersect(line2)!.y).toBe(5);

    expect(line2.intersect(line1)!.x).toBe(2);
    expect(line2.intersect(line1)!.y).toBe(5);

  })

  it('intersects two lines regardless of direction', () => {
    const line1 = new LineSegment(new Point(3,7), new Point(1,3));
    const line2 = new LineSegment(new Point(0,8), new Point(4,2));
    expect(line1.intersect(line2)!.x).toBe(2);
    expect(line1.intersect(line2)!.y).toBe(5);

    expect(line2.intersect(line1)!.x).toBe(2);
    expect(line2.intersect(line1)!.y).toBe(5);

  });

  it('does not intersect two parallel lines', () => {
    const line1 = new LineSegment(new Point(1,2), new Point(2,4));
    const line2 = new LineSegment(new Point(0,1), new Point(1,3));
    expect(line1.intersect(line2)).toBeUndefined();
  })

});