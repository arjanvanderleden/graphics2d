export class Bounds {
  constructor(
    public readonly minX: number,
    public readonly minY: number,
    public readonly maxX: number,
    public readonly maxY: number
  ){}

  get width() {
    return this.maxX - this.minX;
  }

  get height() {
    return this.maxY - this.minY;
  }

  add(otherBounds: Bounds) {
    return new Bounds(
      Math.min(this.minX, otherBounds.minX),
      Math.min(this.minY, otherBounds.minY),
      Math.max(this.maxX, otherBounds.maxX),
      Math.max(this.maxY, otherBounds.maxY),
    )
  }

  addMargins(margin: number) {
    return new Bounds(
      this.minX - margin,
      this.minY - margin,
      this.maxX + margin,
      this.maxY + margin,
    );
  }
}