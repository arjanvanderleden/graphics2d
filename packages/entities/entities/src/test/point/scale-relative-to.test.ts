import { Point } from '../..';

describe('scaleRelativeTo', () => {
  it('should scale relative to a given point', () => {
    const point = Point.create({ x: 15.00001, y: 27 });
    const basePoint = Point.create({ x: 5, y: 5 });
    const newPoint = point.scaleRelativeTo(basePoint, 3);
    expect(Math.abs(newPoint.x - 35.00003)).toBeLessThan(0.000001);
    expect(newPoint.y).toBe(71);
  });

  it('should result in a none transform when scaled realtive to self', () => {
    const point = Point.create({ x: 15.00001, y: 27 });
    const newPoint = point.scaleRelativeTo(point, 3);
    expect(Math.abs(newPoint.x - 15.00001)).toBeLessThan(0.000001);
    expect(newPoint.y).toBe(27);
  });
});
