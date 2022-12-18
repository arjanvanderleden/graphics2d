import React from "react";
import { Bounds } from "@graphics2d/entities";

export interface GridProperties {
  small?: { spacing: number; color: string; width: number };
  large?: { spacing: number; color: string; width: number };
  axis?: { color: string; width: number };
  bounds: Bounds;
}

interface RasterRectProps {
  spacing: number,
  width: number;
  color: string;
  bounds: Bounds;
  id: string;
}

const RasterRect = ({ spacing, width, color, bounds, id }: RasterRectProps) => {
  return <>
    <pattern id={id} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2={spacing} stroke={color} strokeWidth={width} />
      <line x1="0" y1="0" x2={spacing} y2="0" stroke={color} strokeWidth={width} />
    </pattern>
    <rect fill={`url(#${id})`} x={bounds.minX} y={bounds.minY} width={bounds.width} height={bounds.height} />
  </>
}

interface AxisGroupProps {
  color: string;
  width: number;
  bounds: Bounds;
}

const AxisGroup = ({ color, width, bounds }: AxisGroupProps) => {
  return <g id="grid-axis">
    <line x1={0} y1={bounds.minY} x2={0} y2={bounds.maxY} stroke={color} strokeWidth={width} />
    <line x1={bounds.minX} y1={0} x2={bounds.maxX} y2={0} stroke={color} strokeWidth={width} />
  </g>
}

export const GridLayer = ({ small, large, axis, bounds }: GridProperties) => {
  if ((small ?? large ?? axis) === undefined) {
    return null;
  }
  return <g>
    {small && RasterRect({ ...small, bounds, id: 'small-raster' })}
    {large && RasterRect({ ...large, bounds, id: 'large-raster' })}
    {axis && AxisGroup({ ...axis, bounds })}
  </g>
}