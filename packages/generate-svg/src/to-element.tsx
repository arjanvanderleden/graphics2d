import { ArcSegment, Circle, EntityType, Graphics2DEntity, Group, LineSegment, Point, Polyline } from "@graphics2d/entities";
import { SvgCircle } from "./circle";
import { SvgGroup } from "./group";
import { SvgLineSegment } from "./line-segment";
import { SvgPoint } from "./point";
import { SvgPolyline } from "./polyline";
import { SvgArcSegment } from './arc-segment';

export const toElement = (entity: Graphics2DEntity) => {
  switch (true) {
    case (entity.type === EntityType.circle): return SvgCircle({ entity: entity as Circle });
    case (entity.type === EntityType.lineSegment): return SvgLineSegment({ entity: entity as LineSegment });
    case (entity.type === EntityType.point): return SvgPoint({ entity: entity as Point });
    case (entity.type === EntityType.polyline): return SvgPolyline({ entity: entity as Polyline });
    case (entity.type === EntityType.group): return SvgGroup({ entity: entity as Group });
    case (entity.type === EntityType.arcSegment): return SvgArcSegment({ entity: entity as ArcSegment });
    default: return null;
  }
};