// Import styles (automatically injected into <head>)
import '../css/main.css';

// Import modules
import { sayHelloTo } from './modules/mod1';
import addArray from './modules/mod2';

// Import a logger for easier debugging
import debug from 'debug';

const log = debug('app:log');

// The logger should only be enabled if we're not in production
if (ENV !== 'production') {
  // Enable the logger
  debug.enable('*');
  log('Logging is enabled!');

  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  );
} else {
  debug.disable();
}

// Print results to page
const printTarget = document.getElementsByClassName('debug__output')[0];

const result1 = sayHelloTo('Marc');
const result2 = addArray([1, 2, 3, 4]);


document.addEventListener('DOMContentLoaded', () => {
  // Debug
  printTarget.innerText += `sayHelloTo('Marc') => ${result1}\n\n`;
  printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}\n\n`;
});
