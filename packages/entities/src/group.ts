import { Bounds } from './bounds';
import { EntityType, Graphics2DEntity } from './graphics-2d-entity';

export class Group extends Graphics2DEntity {
  readonly type = EntityType.group;

  constructor(private readonly _entities: Graphics2DEntity[] = []) {
    super();
  }

  clone() {
    return new Group(this.entities());
  }

  add(entity: Graphics2DEntity) {
    this._entities.push(entity);
  }

  entities() {
    return this._entities.map(
      (e) => e.clone().setData(e.data) as Graphics2DEntity
    );
  }

  bounds() {
    return this._entities.reduce((a, b) => {
      return a.add(b.bounds());
    }, new Bounds(0, 0, 0, 0));
  }
}
