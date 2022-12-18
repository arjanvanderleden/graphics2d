import { expect } from '@jest/globals';
import type { MatcherFunction } from 'expect';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeEpsilonCloseTo(expected: number): R;
    }
  }
}

const toBeEpsilonCloseTo: MatcherFunction<[expected: unknown]> =
  // `floor` and `ceiling` get types from the line above
  // it is recommended to type them as `unknown` and to validate the values
  function (actual, expected) {
    if (
      typeof actual !== 'number' ||
      typeof expected !== 'number'
    ) {
      throw new Error('These must be of type number!');
    }
    const pass = Math.abs(actual - expected) < Number.EPSILON;
    const message = () => `expected difference between ${
            this.utils.printReceived(actual)
          } and ${
            this.utils.printExpected(expected)
          } to be ${pass ? 'more' : 'less'} than Number.EPSILON`
    return {message, pass}
  };

expect.extend({toBeEpsilonCloseTo});

