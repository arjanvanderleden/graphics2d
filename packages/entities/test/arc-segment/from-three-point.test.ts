import { ArcSegment, Point } from '../../src';
import '../jest-extend-epsilon-check';

describe('argSegment.createFromThreePoints', () => {
  it('creates an arc segment', () => {
    const arcSegment = ArcSegment.fromThreePoints(
      new Point(8, 2),
      new Point(-3, 8),
      new Point(-8, -7)
    )!;
    expect(arcSegment).toBeDefined();
    expect(arcSegment.radius).toBeEpsilonCloseTo(9.325458075093264);
  });
});
