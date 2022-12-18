import { Point } from '../../../src';
import '../jest-extend-epsilon-check';

describe('distance', () => {
  it('return distance to another point', () => {
    const aPoint = Point.create({ x: 10, y: 20 });
    const bPoint = Point.create({ x: 7, y: 16 });
    expect(aPoint.distance(bPoint)).toBeEpsilonCloseTo(5);
    expect(bPoint.distance(aPoint)).toBeEpsilonCloseTo(5);
    expect(bPoint.distance(bPoint)).toBeEpsilonCloseTo(0);

    const cPoint = Point.create({ x: -10, y: -20 });
    const dPoint = Point.create({ x: -7, y: -16 });
    expect(cPoint.distance(dPoint)).toBeEpsilonCloseTo(5);
    expect(dPoint.distance(cPoint)).toBeEpsilonCloseTo(5);
  });
});
