import { Grapics2DEntity } from '@graphics2d/entities';

export * from './render';
export * from './svg';
export * from './svg-properties';

export const isNotUndefined = (e: unknown) => e !== undefined;

export interface SvgElementAttributeProps<T extends Grapics2DEntity> {
  entity: T;
  stroke?: string;
  strokeWidth?: string;
  fill?: string;
  fillOpacity?: number;
}

export function renderSvgElementAttributes(
  props: SvgElementAttributeProps<Grapics2DEntity>
): JSX.IntrinsicAttributes & React.SVGAttributes<SVGElement> {
  const { fill, stroke, strokeWidth, fillOpacity } = {
    ...(props.entity.data as Record<string, unknown>),
    ...props,
  };
  return { fill, stroke, strokeWidth, fillOpacity };
}
