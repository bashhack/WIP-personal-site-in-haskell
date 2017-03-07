// ============================================================================
// Imports
// ============================================================================
import R from 'ramda';


// ============================================================================
// Functional Utilities
// ============================================================================

export const noop = () => ({});
export const inspect = R.tap(console.log);
export const prevent = R.tap(e => e.preventDefault());
export const mapIndexed = R.addIndex(R.map);


// ============================================================================
// Style Utilities
// ============================================================================

/**
 * A callback function to run on fade completion
 * @callback fadeCompleteCallback
 */

/**
 * Fades an element into or out of view over a given duration of time
 * @param {String} type
 *        a fade type (either `in` or other, ex. `out`)
 * @param {number} duration
 *        a time value over which the fade transition will occur (in ms)
 * @param {HTMLElement} el
 *        a DOM element to which the fade transition will be applied
 * @param {fadeCompleteCallback=} cbFunc
 *        an optional callback function that will run on completion of fade
 */
export const fade = (type, duration, el, cbFunc) => {
  let isIn = type === 'in';
  let opacity = isIn ? 0 : 1;
  let interval = 50;
  let gap = interval / duration;
  let fading;

  if (isIn) {
    el.style.display = 'inline';
    el.style.opacity = opacity;
  }

  const tick = () => {
    opacity = isIn ? opacity + gap : opacity - gap;
    el.style.opacity = opacity;

    if (opacity <= 0) el.style.display = 'none';
    if (opacity <= 0 || opacity >= 1) {
      window.clearInterval(fading);
      if (cbFunc) cbFunc();
    }
  };

  fading = window.setInterval(tick, interval);
};


// ============================================================================
// DOM Utilities
// ============================================================================

/**
 * Monkey patches console methods, cleanly handling cross-browser differences.
 * @typedef {Object} Console
 * @return {Console}
 *         The patched window.console object
 */
export const avoidConsoleErrors = () => {
  const console = (window.console = window.console || {});
  const consoleMethods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeline',
    'timelineEnd',
    'timeStamp',
    'trace',
    'warn',
  ];

  const ifUndefined = (consoleObj, value) =>
    !consoleObj[value] ? consoleObj[value] = noop : noop();

  const patchMethods = R.curry(ifUndefined);

  R.map(patchMethods(console), consoleMethods);

  return console;
};


// ============================================================================
// Application Utilities
// ============================================================================

const exec = R.curry(
  (app,
   controller,
   action = ((action === undefined) ? 'init' : action)
  ) => (
    (controller !== '' &&
     app[controller] &&
     typeof app[controller][action] == 'function') ?
    app[controller][action]() : noop()
  )
);

export const doAppInit = app => {
  const controllerAttr = document.body.getAttribute('data-controller').toLowerCase();
  const execWithContext = exec(app);

  execWithContext('common');
  execWithContext(controllerAttr);
  execWithContext(controllerAttr, document.body.getAttribute('data-action'));
};
