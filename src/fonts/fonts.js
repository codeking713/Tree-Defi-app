import { createGlobalStyle } from 'styled-components';

import Adventure from './Adventure.woff';
import Adventure2 from './Adventure.woff2';


export default createGlobalStyle`
    @font-face {
        font-family: 'Adventure';
        src: local('Adventure'), local('Adventure'),
        url(${Adventure2}) format('woff2'),
        url(${Adventure}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;