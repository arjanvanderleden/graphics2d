import { promises } from 'fs';

import { Graphics2DEntity, Group } from '@graphics2d/entities';
import {
  GridProperties,
  renderSvg,
  Svg,
  SvgElementProperties,
} from '@graphics2d/generate-svg';
import { replaceExtension } from './index';
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

export async function renderExample(outputFolder: string, fileName: string) {
  const { entities } = await import(`../examples/${fileName}`);
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
  await promises.writeFile(
    `${outputFolder}/examples/${svgFileName}`,
    svgString,
    {
      encoding: 'utf8',
    }
  );

  const mdFileName = replaceExtension(fileName, '.md');
  const sourceCode = await promises.readFile(
    path.join(__dirname, `../examples/${fileName}`)
  );
  const sourceMarkDown = '```ts\n' + sourceCode + '\n```\n';
  const markDown = `
# ${fileName}

## Source

${sourceMarkDown}

## Rendered to svg

![${fileName}](./${svgFileName})

`;
  await promises.writeFile(`${outputFolder}/examples/${mdFileName}`, markDown, {
    encoding: 'utf8',
  });
}
