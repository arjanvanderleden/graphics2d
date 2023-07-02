import { renderExample } from './render-example';
import path from 'path';

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

export const replaceExtension = (fileName: string, newExtension: string) =>
  fileName.replace(new RegExp(path.extname(`${fileName}$`)), newExtension);

export const generateExamples = (outputFolder: string) => () => {
  const toMarkDownLink = (fileName: string) => {
    const name = replaceExtension(fileName, '');
    return `- [${name}](${outputFolder}/examples/${name}.md)`;
  };
  const toRenderExamplePromise = (f: string) => {
    console.log(toMarkDownLink(f));
    return renderExample(outputFolder, f);
  };
  return Promise.all(files.map(toRenderExamplePromise));
};
