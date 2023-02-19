import { Point } from '../../src';

describe('scale', () => {
  it('should scale relative to the origin', () => {
    const point = Point.create({ x: 15.00001, y: 27 });
    const newPoint = point.scale(3);
    expect(Math.abs(newPoint.x - 45.00003)).toBeLessThan(0.000001);
    expect(newPoint.y).toBe(81);
  });
});
