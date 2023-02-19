import { PointLike } from './index';
import { Bounds } from './bounds';
import { EntityType, Graphics2DEntity } from './graphics-2d-entity';

export class Vector extends Graphics2DEntity {
  bounds() {
    return new Bounds(this.x, this.y, this.x, this.y);
  }
  readonly type: EntityType;

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  static create({ x, y }: PointLike) {
    return new Vector(x, y);
  }

  public constructor(public readonly x: number, public readonly y: number) {
    super();
    this.type = EntityType.vector;
    this.x = x;
    this.y = y;
  }

  add(v: PointLike) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v: PointLike) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  angle() {
    const angle = (Math.atan2(this.y, this.x) * 180) / Math.PI;
    return angle;
  }
}
