import React from 'react';
import {render} from 'react-snapshot';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
  <Router><App /></Router>,
  document.getElementById('root')
);
registerServiceWorker();
