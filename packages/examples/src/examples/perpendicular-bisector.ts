import { LineSegment, Point } from '@graphics2d/entities';
import { SvgElementProperties } from '@graphics2d/generate-svg';

const line = new LineSegment(
  new Point(200, 300),
  new Point(100, -200)
).setData<SvgElementProperties>({
  stroke: 'red',
  strokeWidth: 4,
});
const bisector = line
  .perpendicularBisector()
  .setData<SvgElementProperties>({ stroke: 'blue', strokeWidth: 4 });
export const entities = [line, bisector];
