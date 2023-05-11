import React from 'react';
import { Group } from '@graphics2d/entities';
import { GridLayer, GridProperties } from './grid-layer';
import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';
import { toElement } from './to-element';

interface SvgProps extends SvgElementAttributeProps<Group> {
  grid?: Omit<GridProperties, 'bounds'>;
  backgroundColor?: string;
  margin?: number;
  width?: number;
  heigth?: number;
}

export const Svg = (props: SvgProps) => {
  const { entity, backgroundColor, grid, margin } = props;
  const bounds = entity.bounds().addMargins(margin ?? 0);
  const { minX, maxY, width, height } = bounds;
  const viewbox = `${minX} ${-maxY} ${width} ${height}`;

  return <svg viewBox={viewbox}
    xmlns="http://www.w3.org/2000/svg"
    style={{ backgroundColor }}
    width={props.width}
    height={props.heigth}
    {...renderSvgElementAttributes(props)}>
    <g transform='scale(1,-1)'>
      <GridLayer
        bounds={bounds}
        axis={grid?.axis}
        small={grid?.small}
        large={grid?.large}
      />
      {entity.entities().map(toElement)}
    </g>
  </svg>
}