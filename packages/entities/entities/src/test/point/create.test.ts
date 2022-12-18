import { Point } from "../../../src";

class SomeClass {
  constructor(public x: number, public y: number) {
  }
}

 describe('static create', () => {
    it('should create a from object with x and y properties', () => {
      const point = Point.create({ x: 10, y: 20 });
      expect(point).toBeDefined();
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
    });

    it('should create a clone of a point', () => {
      const point1 = Point.create({ x: 10, y: 20 });
      const point2 = Point.create(point1);
      expect(point2).toBeDefined();
      expect(point2.x).toBe(10);
      expect(point2.y).toBe(20);
    });

    it('should create a point from any objects with propties x and y', () => {
      const obj = new SomeClass(20, 30);
      const point2 = Point.create(obj);
      expect(point2).toBeDefined();
      expect(point2.x).toBe(20);
      expect(point2.y).toBe(30);
    });
  });