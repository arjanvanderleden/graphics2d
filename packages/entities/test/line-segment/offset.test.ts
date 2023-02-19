import { LineSegment, Point } from '../../src';
import '../jest-extend-epsilon-check';

describe('line.offset', () => {
  it('offsets a line segment', () => {
    const line = new LineSegment(new Point(1, 1), new Point(4, 2));
    const offsetLine = line.offset(1, new Point(0, 100));

    expect(offsetLine.firstPoint.distance(line.firstPoint)).toBeEpsilonCloseTo(
      1
    );
    expect(
      offsetLine.secondPoint.distance(line.secondPoint)
    ).toBeEpsilonCloseTo(1);

    expect(offsetLine.firstPoint.x).toBeEpsilonCloseTo(0.6837722339831613);
    expect(offsetLine.firstPoint.y).toBeEpsilonCloseTo(1.9486832980505135);
    expect(offsetLine.secondPoint.x).toBeEpsilonCloseTo(3.683772233983161);
    expect(offsetLine.secondPoint.y).toBeEpsilonCloseTo(2.9486832980505135);
  });

  it('offsets a line segment to the other side', () => {
    const line = new LineSegment(new Point(1, 1), new Point(4, 2));
    const offsetLine = line.offset(1, new Point(0, -100));

    expect(offsetLine.firstPoint.distance(line.firstPoint)).toBeEpsilonCloseTo(
      1
    );
    expect(
      offsetLine.secondPoint.distance(line.secondPoint)
    ).toBeEpsilonCloseTo(1);

    expect(offsetLine.firstPoint.x).toBeEpsilonCloseTo(1.3162277660168387);
    expect(offsetLine.firstPoint.y).toBeEpsilonCloseTo(0.051316701949486565);
    expect(offsetLine.secondPoint.x).toBeEpsilonCloseTo(4.316227766016839);
    expect(offsetLine.secondPoint.y).toBeEpsilonCloseTo(1.0513167019494865);
  });
});
