import React from 'react';
import { Point } from '@graphics2d/entities';
import { SvgElementAttributeProps } from './index';

const POINT_RADIUS = 5;

type PointProps = SvgElementAttributeProps<Point>

export const SvgPoint = (props: PointProps) => {
  const { entity } = props;
  const data = (entity.data ?? {}) as { fill?: string }
  const fill = data.fill ?? '#000';
  return <g transform={`translate(${entity.x},${entity.y})`}>
    <line x1="0" y1={-3 * POINT_RADIUS} x2="0" y2={3 * POINT_RADIUS} stroke={fill} strokeWidth="1" />
    <line x1={-3 * POINT_RADIUS} y1="0" x2={3 * POINT_RADIUS} y2="0" stroke={fill} strokeWidth="1" />
    <circle r={2 * POINT_RADIUS} stroke={fill} strokeWidth="1" fill="none" />
    <circle r={POINT_RADIUS} fill={fill} />
  </g>
}
