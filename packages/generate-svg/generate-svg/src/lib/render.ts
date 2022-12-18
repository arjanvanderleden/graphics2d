import { ReactElement } from 'react';
import * as ReactServerDom from 'react-dom/server';

export const renderSvg = (element: ReactElement) => ReactServerDom.renderToStaticMarkup(element);