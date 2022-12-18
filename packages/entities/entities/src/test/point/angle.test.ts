import { Point } from '../../../src';
describe('Point angle', () => {
  it('calculates angles', () => {
    expect(new Point(10, 0).angle()).toBe(0);
    expect(new Point(0, 10).angle()).toBe(90);
    expect(new Point(0, -10).angle()).toBe(-90);
    expect(new Point(-10, 0).angle()).toBe(180);
    expect(new Point(-10, -0).angle()).toBe(-180);
  });
});
