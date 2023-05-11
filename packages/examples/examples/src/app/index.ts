import { promises } from 'fs';
import * as path from 'path';
import { Graphics2DEntity, Group } from '@graphics2d/entities';
import {
  renderSvg,
  Svg,
  SvgElementProperties,
  GridProperties,
} from '@graphics2d/generate-svg';

const gridProperties: Omit<GridProperties, 'bounds' | 'id'> = {
  small: { width: 1, spacing: 10, color: '#EEE' },
  large: { width: 2, spacing: 50, color: '#CCC' },
  axis: { width: 2, color: '#666' },
};

const addDefaultSvgProperties = (entity: Graphics2DEntity) => {
  return entity.data === undefined
    ? entity.setData<SvgElementProperties>({
        stroke: '#000',
        strokeWidth: 2,
        fill: '#BBB',
      })
    : entity;
};

const replaceExtension = (fileName: string, newExtension: string) =>
  fileName.replace(new RegExp(path.extname(`${fileName}$`)), newExtension);

async function renderExample(fileName: string) {
  const { entities } = await import(`./examples/${fileName}`);
  const svgString = renderSvg(
    Svg({
      entity: new Group(entities.map(addDefaultSvgProperties)),
      backgroundColor: 'white',
      grid: gridProperties,
      margin: 50,
      width: 500,
    })
  );
  const svgFileName = replaceExtension(fileName, '.svg');
  await promises.writeFile(`documentation/examples/${svgFileName}`, svgString, {
    encoding: 'utf8',
  });

  const mdFileName = replaceExtension(fileName, '.md');
  const sourceCode = await promises.readFile(
    __dirname + `/examples/${fileName}`
  );
  const sourceMarkDown = '```ts\n' + sourceCode + '\n```\n';
  const markDown = `
# ${fileName}

## Source

${sourceMarkDown}

## Rendered to svg

![${fileName}](./${svgFileName})

`;
  await promises.writeFile(`documentation/examples/${mdFileName}`, markDown, {
    encoding: 'utf8',
  });
}

const endProcess = () => {
  console.log('rendering done');
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
  'polyline.ts',
];

const toMarkDownLink = (fileName: string) => {
  const name = replaceExtension(fileName, '');
  return `- [${name}](./documentation/examples/${name}.md)`;
};
console.log(files.map(toMarkDownLink).join('\n') + '\n\n');

const toPromise = (f: string) => renderExample(f);
Promise.all(files.map(toPromise)).then(endProcess);

export const generateExamples = () => {
  renderSvg;
};
