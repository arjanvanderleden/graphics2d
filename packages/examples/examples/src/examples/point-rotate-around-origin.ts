import { SvgElementProperties } from '../../src/utilities/svg';
import { Circle, Point } from '../../src/entities';

const firstPoint = new Point(200, 0).setData({ fill: `#000` });

const points = Array.from(new Array(10)).reduce(
  (p, _, index) => {
    const hex = ((index + 1) * 25).toString(16).repeat(3);
    return [...p, firstPoint.rotateAroundOrigin(index * 30).setData({ fill: `#${hex}` })];
  },
  [firstPoint]
);

export const entities = [
  new Circle(Point.origin, 200).setData<SvgElementProperties>({ fill: 'orange', fillOpacity: 0.5 }),
  ...points,
];
