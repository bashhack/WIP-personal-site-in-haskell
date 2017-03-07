// ============================================================================
// Imports
// ============================================================================

// Import a logger for easier debugging
import debug from 'debug';


// ============================================================================
// Logger
// ============================================================================

const log = debug('app:log');
export const printTarget = document.getElementsByClassName('debug__output')[0];

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
