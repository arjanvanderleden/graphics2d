import { ReactElement } from 'react';
import * as ReactServerDom from 'react-dom/server';

export const renderSvg = async (element: ReactElement) => {
  const stream = ReactServerDom.renderToStaticNodeStream(element);
  const chunks: string[] = [];
  return new Promise<string>((resolve, reject) => {
    stream.on('data', (chunk: string) => chunks.push(chunk));
    stream.on('end', () => resolve(chunks.join('')));
    stream.on('error', (error) => reject(error));
  });
};
