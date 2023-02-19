import { Point } from '../../src';

describe('snapTo', () => {
  it('should return a new point snapped to grid (positive coords)', () => {
    const point = Point.create({ x: 12.33333, y: 24 });
    const newPoint = point.snapTo(10, 10);
    expect(newPoint.x).toBe(10);
    expect(newPoint.y).toBe(20);
  });

  it('should return a new point snapped to grid (negative coords)', () => {
    const point = Point.create({ x: -12.33333, y: -24 });
    const newPoint = point.snapTo(10, 10);
    expect(newPoint.x).toBe(-10);
    expect(newPoint.y).toBe(-20);
  });

  it('should return a new point snapped to rounded coords', () => {
    const point = Point.create({ x: 15.00001, y: 27 });
    const newPoint = point.snapTo(10, 10);
    expect(newPoint.x).toBe(20);
    expect(newPoint.y).toBe(30);
  });
});
