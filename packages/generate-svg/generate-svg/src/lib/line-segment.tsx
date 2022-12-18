import React from 'react';
import { LineSegment } from '@graphics2d/entities';
import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';

type LineSegmentProps = SvgElementAttributeProps<LineSegment>

export const SvgLineSegement = (props: LineSegmentProps) => {
  const { firstPoint, secondPoint } = props.entity;
  return <line x1={firstPoint.x} y1={firstPoint.y} x2={secondPoint.x} y2={secondPoint.y} {...renderSvgElementAttributes(props)} />
}