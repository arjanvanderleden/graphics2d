import { Point } from "../../../src";

describe('toString', () => {
    it('should return a string representation', () => {
      const newPoint = Point.create({ x: 10.5, y: 20.5 });
      const s = String(newPoint);
      expect(s).toBe('10.5,20.5');
    });
  });
