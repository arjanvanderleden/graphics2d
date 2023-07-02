import path from 'path';
import { generateExamples } from './app';

const start = () => {
  console.log('Starting generation of examples');
  return Promise.resolve();
};

const error = (e: unknown) => {
  console.log(`error: ${e}`);
};

const stop = () => {
  console.log('done.');
  process.exit();
};

const files = [
  'polyline.ts',
  'perpendicular.ts',
  'three-point-circle.ts',
  'circle-line-intersection.ts',
  'circle-circle-intersection.ts',
  'perpendicular-bisector.ts',
  'circle-tangent.ts',
  'point-rotate-around-origin.ts',
  'fillet.ts',
  'arc-segment.ts',
  'two-point-radius-arcs.ts',
  'minor-major-arc-segment.ts',
  'polyline.ts',
];

const outputFolder = path.join(__dirname, '../../../documentation');
const inputFolder = path.join(__dirname, 'examples');

start()
  .then(generateExamples({ outputFolder, inputFolder }, files))
  .catch(error)
  .finally(stop);
