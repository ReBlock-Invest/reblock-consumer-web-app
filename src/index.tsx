import React from 'react';
import ReactDOM from 'react-dom/client';

import { Buffer } from 'buffer';

import App from './App';

import 'styles/reset.css'
import 'styles/layout.css'
import 'styles/libraries.css'
import 'styles/utils.css'
import 'styles/antd-overrides.css'

window.Buffer = window.Buffer || Buffer

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

