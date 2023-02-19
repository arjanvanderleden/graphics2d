import { Point } from './index';
import { Bounds } from './bounds';
import { EntityType, Graphics2DEntity } from './graphics-2d-entity';

export enum PolylineClosedMode {
  closed = 'closed',
  open = 'open',
}

export class Polyline extends Graphics2DEntity {
  type = EntityType.polyline;
  constructor(
    public readonly points: Point[],
    public readonly closed: PolylineClosedMode
  ) {
    super();
  }

  clone() {
    return new Polyline(
      this.points.map((p) => p.clone()),
      this.closed
    );
  }

  close() {
    return new Polyline([...this.points], PolylineClosedMode.closed);
  }

  open() {
    return new Polyline([...this.points], PolylineClosedMode.open);
  }

  bounds() {
    return this.points.reduce((a, b) => {
      return a.add(new Bounds(b.x, b.y, b.x, b.y));
    }, new Bounds(0, 0, 0, 0));
  }
}
