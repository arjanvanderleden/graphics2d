import { promises } from 'fs';

import { Graphics2DEntity, Group } from '@graphics2d/entities';
import {
  GridProperties,
  renderSvg,
  Svg,
  SvgElementProperties,
} from '@graphics2d/generate-svg';
import { OutputInputFolderArgument, replaceExtension } from './index';
import path from 'path';

export const gridProperties: Omit<GridProperties, 'bounds' | 'id'> = {
  small: { width: 1, spacing: 10, color: '#EEE' },
  large: { width: 2, spacing: 50, color: '#CCC' },
  axis: { width: 2, color: '#666' },
};

export const addDefaultSvgProperties = (entity: Graphics2DEntity) => {
  return entity.data === undefined
    ? entity.setData<SvgElementProperties>({
        stroke: '#000',
        strokeWidth: 2,
        fill: '#BBB',
      })
    : entity;
};

export async function renderExample(
  { outputFolder, inputFolder }: OutputInputFolderArgument,
  fileName: string
) {
  const sourceFileName = path.join(inputFolder, fileName);
  const svgFileName = path.join(
    outputFolder,
    'examples',
    replaceExtension(fileName, '.svg')
  );
  const mdFileName = replaceExtension(svgFileName, '.md');

  const { entities } = await import(sourceFileName);
  const svgString = await renderSvg(
    Svg({
      entity: new Group(entities.map(addDefaultSvgProperties)),
      backgroundColor: 'white',
      grid: gridProperties,
      margin: 50,
      width: 500,
    })
  );
  await promises.writeFile(svgFileName, svgString, {
    encoding: 'utf8',
  });

  const sourceCode = await promises.readFile(sourceFileName);
  const sourceMarkDown = '```ts\n' + sourceCode + '\n```\n';

  const markDown = `
# ${fileName}

## Source

${sourceMarkDown}

## Renders to svg

![${fileName}](./${replaceExtension(fileName, '.svg')})

`;

  await promises.writeFile(mdFileName, markDown, {
    encoding: 'utf8',
  });
}
