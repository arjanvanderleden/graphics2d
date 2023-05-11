import React from 'react';
import { Group } from '@graphics2d/entities';
import { renderSvgElementAttributes, SvgElementAttributeProps } from './index';
import { toElement } from './to-element';

type GroupProps = SvgElementAttributeProps<Group>

export const SvgGroup = (props: GroupProps) => {
  const { entity } = props;
  return <g {...renderSvgElementAttributes(props)}>
    {entity.entities().map(toElement)}
  </g>
}