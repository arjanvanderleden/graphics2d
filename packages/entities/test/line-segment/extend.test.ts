import { LineSegment, Point, LineSegmentExtendMode } from '../../src';

describe('line.extend', () => {
  it('extends from origin', () => {
    const line = new LineSegment(new Point(0, 0), new Point(3, 4)); // length 4
    const newLine = line.extendToLength(10, LineSegmentExtendMode.fromFirst);
    expect(newLine.length()).toBe(10);
    expect(newLine.valueOf()).toStrictEqual([
      { x: 0, y: 0 },
      { x: 6, y: 8 },
    ]);
  });
});
