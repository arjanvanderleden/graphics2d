import { LineSegment, Point } from '../../../src';

describe('line.parallel', () => {
  it('returns true if lines are parallel', () => {
    const line1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const line2 = new LineSegment(new Point(1, 0), new Point(2, 1));
    expect(line1.isParallelTo(line2)).toBe(true);
    expect(line2.isParallelTo(line1)).toBe(true);

    const line3 = line2.invert();
    expect(line1.isParallelTo(line3)).toBe(true);
    expect(line3.isParallelTo(line1)).toBe(true);
  });

  it('returns false if lines are not', () => {
    const line1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const line2 = new LineSegment(new Point(1, 0), new Point(2.1, 1));
    expect(line1.isParallelTo(line2)).toBe(false);
    expect(line2.isParallelTo(line1)).toBe(false);
  });

  it('returns true if lines identical', () => {
    const line1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    expect(line1.isParallelTo(line1)).toBe(true);
  });
});
