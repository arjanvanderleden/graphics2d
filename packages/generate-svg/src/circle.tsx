import React from 'react';
import { Circle } from '@graphics2d/entities';
import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';

type CircleProps = SvgElementAttributeProps<Circle>

export const SvgCircle = (props: CircleProps) => {
  const { center, radius } = props.entity;
  return <circle cx={center.x} cy={center.y} r={radius} {...renderSvgElementAttributes(props)} />
}


