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

start()
  .then(generateExamples(path.join(__dirname, '../../../documentation')))
  .catch(error)
  .finally(stop);
