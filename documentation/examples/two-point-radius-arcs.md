
# two-point-radius-arcs.ts

## Source

```ts
import { Point, ArcSegment } from '@graphics2d/entities';
import { SvgElementProperties } from '@graphics2d/generate-svg';

const grayArcData: SvgElementProperties = {
  stroke: '#666',
  strokeWidth: 8,
  fill: 'none',
};
const elementProperties = [
  grayArcData,
  { ...grayArcData, stroke: 'red' },
  { ...grayArcData, stroke: 'blue' },
  { ...grayArcData, stroke: 'green' },
];
const point1 = new Point(30, 70);
const point2 = new Point(-10, -10);
const [minorMajor1, minorMajor2] = ArcSegment.fromTwoPointAndRadius(
  point1,
  point2,
  100
);

export const entities = [
  point1.setData({ fill: `#000` }),
  point2.setData({ fill: `#000` }),
  minorMajor1?.minor.center.setData({ fill: `#000` }),
  minorMajor2?.minor.center.setData({ fill: `#000` }),
  minorMajor1?.minor.setData(elementProperties[0]),
  minorMajor1?.major.setData(elementProperties[1]),
  minorMajor2?.minor.setData(elementProperties[2]),
  minorMajor2?.major.setData(elementProperties[3]),
].filter((e) => e !== undefined);

```


## Renders to svg

![two-point-radius-arcs.ts](./two-point-radius-arcs.svg)

