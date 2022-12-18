import { LineSegment, Point } from '../../../src';
import '../jest-extend-epsilon-check';

describe('line.offset', () => {
  it('offsets a linesegment', () => {
    const line = new LineSegment(new Point(1, 1), new Point(4, 2));
    const offsetline = line.offset(1, new Point(0, 100));

    expect(offsetline.firstPoint.distance(line.firstPoint)).toBeEpsilonCloseTo(
      1
    );
    expect(
      offsetline.secondPoint.distance(line.secondPoint)
    ).toBeEpsilonCloseTo(1);

    expect(offsetline.firstPoint.x).toBeEpsilonCloseTo(0.6837722339831613);
    expect(offsetline.firstPoint.y).toBeEpsilonCloseTo(1.9486832980505135);
    expect(offsetline.secondPoint.x).toBeEpsilonCloseTo(3.683772233983161);
    expect(offsetline.secondPoint.y).toBeEpsilonCloseTo(2.9486832980505135);
  });

  it('offsets a linesegment to the other side', () => {
    const line = new LineSegment(new Point(1, 1), new Point(4, 2));
    const offsetline = line.offset(1, new Point(0, -100));

    expect(offsetline.firstPoint.distance(line.firstPoint)).toBeEpsilonCloseTo(
      1
    );
    expect(
      offsetline.secondPoint.distance(line.secondPoint)
    ).toBeEpsilonCloseTo(1);

    expect(offsetline.firstPoint.x).toBeEpsilonCloseTo(1.3162277660168387);
    expect(offsetline.firstPoint.y).toBeEpsilonCloseTo(0.051316701949486565);
    expect(offsetline.secondPoint.x).toBeEpsilonCloseTo(4.316227766016839);
    expect(offsetline.secondPoint.y).toBeEpsilonCloseTo(1.0513167019494865);
  });
});
