import './style.css';
import { createTerminalApp } from './terminal/Terminal.js';

const appRoot = document.querySelector('#app');

if (!appRoot) {
  throw new Error('App root element not found.');
}

createTerminalApp(appRoot);
