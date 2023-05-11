import { Graphics2DEntity } from '@graphics2d/entities';

export * from './render';
export * from './svg';
export * from './svg-properties';
export * from './arc-segment';
export * from './circle';
export * from './grid-layer';
export * from './group';
export * from './line-segment';
export * from './point';
export * from './polyline';
export * from './to-element';

export const isNotUndefined = (e: unknown) => e !== undefined;

export interface SvgElementAttributeProps<T extends Graphics2DEntity> {
  entity: T;
  stroke?: string;
  strokeWidth?: string;
  fill?: string;
  fillOpacity?: number;
}

export function renderSvgElementAttributes(
  props: SvgElementAttributeProps<Graphics2DEntity>
): JSX.IntrinsicAttributes & React.SVGAttributes<SVGElement> {
  const { fill, stroke, strokeWidth, fillOpacity } = {
    ...(props.entity.data as Record<string, unknown>),
    ...props,
  };
  return { fill, stroke, strokeWidth, fillOpacity };
}
