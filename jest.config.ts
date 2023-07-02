/* eslint-disable */
export default {
  displayName: 'entities',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '@graphics2d/entities': '<rootDir>/packages/entities/src/index.ts',
  },
  transform: {
    '^.+\\.(ts|js|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx'],
  coverageDirectory: '../../coverage/packages/entities',
};
