import React from 'react';
import { ArcSegment, Point } from '@graphics2d/entities';
import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';

type ArcSegmentProps = SvgElementAttributeProps<ArcSegment>

export const SvgArcSegment = (props: ArcSegmentProps) => {
  const { center, radius, startAngle, sweptAngle } = props.entity;
  const startPoint = Point.createFromAngle(startAngle, radius).add(center);
  const endPoint = Point.createFromAngle(startAngle + sweptAngle, radius).add(center);
  const sweptFlag = sweptAngle < 0 ? 0 : 1;
  const largeArcFlag = Math.abs(sweptAngle) > 180 ? 1 : 0;
  const path = `M ${startPoint.x}, ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweptFlag} ${endPoint.x}, ${endPoint.y}`
  return <path d={path} {...renderSvgElementAttributes(props)} />
}


