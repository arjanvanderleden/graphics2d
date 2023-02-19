import { Point } from '../../src';

describe('add', () => {
  it('should return a new point with added coordinates', () => {
    const point = Point.create({ x: 10, y: 20 });
    const addPoint = Point.create({ x: 13, y: 27 });
    const newPoint = point.add(addPoint);
    expect(newPoint.x).toBe(23);
    expect(newPoint.y).toBe(47);
  });
});
