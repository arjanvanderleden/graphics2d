import { Bounds } from './bounds';

export enum EntityType {
  lineSegment = 'lineSegment',
  point = 'point',
  arcSegment = 'arcSegment',
  text = 'text',
  polyline = 'polyline',
  path = 'path',
  group = 'group',
  svg = 'svg',
  vector = 'vector',
  circle = 'circle',
}

export abstract class Grapics2DEntity {
  abstract type: EntityType;
  abstract clone(): Grapics2DEntity;
  protected _data: unknown;
  get data() {
    return this._data;
  }
  setData<T>(data: T) {
    this._data = data;
    return this;
  }
  abstract bounds(): Bounds;
}
