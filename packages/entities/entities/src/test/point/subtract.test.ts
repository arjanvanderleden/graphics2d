import { Point } from "../../../src";

describe('subtract', () => {
    it('should return a new point with subtracted positive coords', () => {
      const point = Point.create({ x: 10.5, y: 20.5 });
      const addPoint = Point.create({ x: 10, y: 20 });
      const newPoint = point.subtract(addPoint);
      expect(newPoint.x).toBe(0.5);
      expect(newPoint.y).toBe(0.5);
    });

    it('should return a new point with subtracted negative coords', () => {
      const point = Point.create({ x: 10.5, y: 20.5 });
      const addPoint = Point.create({ x: -10, y: -20 });
      const newPoint = point.subtract(addPoint);
      expect(newPoint.x).toBe(20.5);
      expect(newPoint.y).toBe(40.5);
    });
  });