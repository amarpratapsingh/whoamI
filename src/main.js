import './style.css';
import { createBootOverlay } from './boot/BootOverlay.js';
import { createTerminalApp } from './terminal/Terminal.js';

createBootOverlay();

const appRoot = document.querySelector('#app');

if (!appRoot) {
  throw new Error('App root element not found.');
}

createTerminalApp(appRoot);
