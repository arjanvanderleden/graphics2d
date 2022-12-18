import { LineSegment, Point } from '../../../src';

describe('line.perpendicular', () => {
  it('creates a perpendicular line', () => {
    const line = new LineSegment(new Point(0, 0), new Point(4, 2));
    const otherLine = line.createPerpendicularFrom(new Point(1, 3));
    expect(otherLine.valueOf()).toStrictEqual([
      { x: 1, y: 3 },
      { x: 2, y: 1 },
    ]);
  });

  it('creates a perpendicular line for horizontal lines', () => {
    const line = new LineSegment(new Point(1, 2), new Point(3, 2));
    const otherLine = line.createPerpendicularFrom(new Point(2.5, 0.5));
    expect(otherLine.valueOf()).toStrictEqual([
      { x: 2.5, y: 0.5 },
      { x: 2.5, y: 2 },
    ]);
  });

  it('creates a perpendicular line for vertical lines', () => {
    const line = new LineSegment(new Point(1, 1), new Point(1, 3));
    const otherLine = line.createPerpendicularFrom(new Point(4, 2.5));
    expect(otherLine.valueOf()).toStrictEqual([
      { x: 4, y: 2.5 },
      { x: 1, y: 2.5 },
    ]);
  });
});
