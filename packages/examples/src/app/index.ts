import { renderExample } from './render-example';
import path from 'path';

export type OutputInputFolderArgument = {
  outputFolder: string;
  inputFolder: string;
};

export const replaceExtension = (fileName: string, newExtension: string) =>
  fileName.replace(new RegExp(path.extname(`${fileName}$`)), newExtension);

export const generateExamples =
  ({ outputFolder, inputFolder }: OutputInputFolderArgument, files: string[]) =>
  () => {
    const toMarkDownLink = (fileName: string) => {
      const name = replaceExtension(fileName, '');
      return `- [${name}](${outputFolder}/examples/${name}.md)`;
    };
    const toRenderExamplePromise = (f: string) => {
      console.log(toMarkDownLink(f));
      return renderExample({ outputFolder, inputFolder }, f);
    };
    return Promise.all(files.map(toRenderExamplePromise));
  };
