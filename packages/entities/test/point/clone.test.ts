import { Point } from '../../src';

describe('clone', () => {
  it('should clone a point', () => {
    const newPoint = Point.create({ x: 10.5, y: 20.5 }).clone();
    expect(newPoint.x).toBe(10.5);
    expect(newPoint.y).toBe(20.5);
  });
});
