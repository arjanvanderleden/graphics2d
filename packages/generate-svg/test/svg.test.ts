import { Group, LineSegment, Point } from '@graphics2d/entities';
import { renderSvg, Svg } from '../src';

describe('group to svg', () => {
  it('creates a svg with child elements', async () => {
    const group = new Group([
      new LineSegment(new Point(20, 30), new Point(170, -120)),
      new LineSegment(new Point(170, -120), new Point(-100, -50)),
      new LineSegment(new Point(-100, -50), new Point(20, 30)),
      new Point(50, 50),
      new Point(0, 50),
      new Point(50, 0),
      new Point(0, 0),
      new Point(25, 25),
    ]);
    const s = await renderSvg(Svg({ entity: group }));
    console.log(s);
    expect(s.startsWith(`<svg`)).toBe(true);
  });
});
