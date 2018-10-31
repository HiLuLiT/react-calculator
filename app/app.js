/* eslint-disable */
import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';

import './assets/styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Calculator from './components/Calculator/Calculator';

render(
  <Calculator></Calculator>,
  document.querySelector('#app')
);