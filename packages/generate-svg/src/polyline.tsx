import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';
import { Polyline, PolylineClosedMode } from '@graphics2d/entities';
import React from 'react';

type PolylineProps = SvgElementAttributeProps<Polyline>;

export const SvgPolyline = (props: PolylineProps) => {
  const { entity } = props;
  const points = entity.points.map(p => `${p.x} ${p.y}`).join(' ');
  return entity.closed === PolylineClosedMode.closed
    ? <polygon points={points} {...renderSvgElementAttributes(props)} />
    : <polyline points={points} {...renderSvgElementAttributes(props)} />
}