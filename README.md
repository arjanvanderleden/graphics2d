# Grapics 2D

## Install

```bash
npm install @graphics2d/entities @graphics2d/generate-svg
```

## Use

```typescript
import { promises } from 'fs';
import { Point, LineSegment, Group, Circle } from '@graphics2d/entities';
import { renderSvg, Svg, GridProperties } from '@graphics2d/generate-svg';

const point = new Point(100, 200);
const line = new LineSegment(new Point(200, 300), new Point(100, -200));
const perpendicularLine = line.createPerpendicularFrom(point);
const movedLine = perpendicularLine
  .invert() // reverse first and second point
  .moveToPoint(line.midPoint());

const gridProperties: Omit<GridProperties, 'bounds' | 'id'> = {
  small: { width: 1, spacing: 10, color: '#EEE' },
  large: { width: 2, spacing: 50, color: '#CCC' },
  axis: { width: 2, color: '#666' },
};

const group = new Group([
  new Circle(point, perpendicularLine.length()).setData<SvgElementProperties>({
    fill: '#CCC',
    stroke: '#000',
    strokeWidth: 1,
  }),
  point,
  line.setData<SvgElementProperties>({ stroke: '#00F', strokeWidth: 2 }),
  perpendicularLine.setData<SvgElementProperties>({
    stroke: '#000',
    strokeWidth: 1,
  }),
  movedLine.setData<SvgElementProperties>({ stroke: '#C00', strokeWidth: 1 }),
  new Point(0, 100).setData<SvgElementProperties>({ fill: 'red' }),
  new Point(200, 0).setData<SvgElementProperties>({ fill: '#CCF' }),
  new Point(0, 0),
]);

const svgString = renderSvg(
  Svg({
    entity: group,
    backgroundColor: 'white',
    grid: gridProperties,
    margin: 50,
  })
);

promises
  .writeFile('documentation/readme/use.svg', svgString, { encoding: 'utf8' })
  .then(() => process.exit());
```

## Result

```svg
<svg viewBox="-50 -350 300 600" style="background-color:white"
  xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(1,-1)">
    <g>
      <pattern id="small-raster" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#EEE" stroke-width="1"></line>
        <line x1="0" y1="0" x2="10" y2="0" stroke="#EEE" stroke-width="1"></line>
      </pattern>
      <rect fill="url(#small-raster)" x="-50" y="-250" width="300" height="600"></rect>
      <pattern id="large-raster" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="50" stroke="#CCC" stroke-width="2"></line>
        <line x1="0" y1="0" x2="50" y2="0" stroke="#CCC" stroke-width="2"></line>
      </pattern>
      <rect fill="url(#large-raster)" x="-50" y="-250" width="300" height="600"></rect>
      <g id="grid-axis">
        <line x1="0" y1="-250" x2="0" y2="350" stroke="#666" stroke-width="2"></line>
        <line x1="-50" y1="0" x2="250" y2="0" stroke="#666" stroke-width="2"></line>
      </g>
    </g>
    <circle cx="100" cy="200" r="78.44645405527362" fill="#CCC" stroke="#000" stroke-width="1"></circle>
    <g transform="translate(100,200)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#000" stroke-width="1"></line>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#000" stroke-width="1"></line>
      <circle r="10" stroke="#000" stroke-width="1" fill="none"></circle>
      <circle r="5" fill="#000"></circle>
    </g>
    <line x1="200" y1="300" x2="100" y2="-200" stroke="#00F" stroke-width="2"></line>
    <line x1="100" y1="200" x2="176.92307692307705" y2="184.6153846153852" stroke="#000" stroke-width="1"></line>
    <line x1="150" y1="50" x2="73.07692307692295" y2="65.38461538461479" stroke="#C00" stroke-width="1"></line>
    <g transform="translate(0,100)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="red" stroke-width="1"></line>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="red" stroke-width="1"></line>
      <circle r="10" stroke="red" stroke-width="1" fill="none"></circle>
      <circle r="5" fill="red"></circle>
    </g>
    <g transform="translate(100,0)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#CCF" stroke-width="1"></line>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#CCF" stroke-width="1"></line>
      <circle r="10" stroke="#CCF" stroke-width="1" fill="none"></circle>
      <circle r="5" fill="#CCF"></circle>
    </g>
    <g transform="translate(0,0)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="#000" stroke-width="1"></line>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#000" stroke-width="1"></line>
      <circle r="10" stroke="#000" stroke-width="1" fill="none"></circle>
      <circle r="5" fill="#000"></circle>
    </g>
  </g>
</svg>
```

## Svg rendered

![Use][use]

[use]: ./documentation/readme/use.svg

## more examples

- [polyline](documentation/examples/polyline.md)
- [perpendicular](documentation/examples/perpendicular.md)
- [three-point-circle](documentation/examples/three-point-circle.md)
- [circle-line-intersection](documentation/examples/circle-line-intersection.md)
- [circle-circle-intersection](documentation/examples/circle-circle-intersection.md)
- [perpendicular-bisector](documentation/examples/perpendicular-bisector.md)
- [circle-tangent](documentation/examples/circle-tangent.md)
- [point-rotate-around-origin](documentation/examples/point-rotate-around-origin.md)
- [fillet](documentation/examples/fillet.md)
- [arc-segment](documentation/examples/arc-segment.md)
- [two-point-radius-arcs](documentation/examples/two-point-radius-arcs.md)
- [minor-major-arc-segment](documentation/examples/minor-major-arc-segment.md)
- [polyline](documentation/examples/polyline.md)

## todo

- use react as peer dependency
- additional test
- extra entities and methods
- polyline filleting
- create shapes from entities
