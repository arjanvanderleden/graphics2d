import { LineSegment, Point } from '../../../src';
import '../jest-extend-epsilon-check';

describe('line.slope', () => {
  it('calculates a gradient for lines with', () => {
    expect(
      new LineSegment(new Point(0, 0), new Point(2, 2)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(1);
    expect(
      new LineSegment(new Point(2, 2), new Point(0, 0)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(1);

    expect(
      new LineSegment(new Point(0, 0), new Point(-2, 2)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(-1);
    expect(
      new LineSegment(new Point(-2, 2), new Point(0, 0)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(-1);

    expect(
      new LineSegment(new Point(0, 0), new Point(2, 0)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(0);
    expect(
      new LineSegment(new Point(2, 0), new Point(0, 0)).gradientIntercept()
        .gradient
    ).toBeEpsilonCloseTo(0);

    expect(
      new LineSegment(new Point(0, 0), new Point(0, 2)).gradientIntercept()
        .gradient
    ).toBe(Number.POSITIVE_INFINITY);
    expect(
      new LineSegment(new Point(0, 2), new Point(0, 0)).gradientIntercept()
        .gradient
    ).toBe(Number.POSITIVE_INFINITY);
  });
});
