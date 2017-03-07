// ============================================================================
// Imports
// ============================================================================
import { noop, fade } from './utils';


// ============================================================================
// Sidebar/Navigation
// ============================================================================

/**
 * Manages the cycling of personal info descriptions in sidebar.
 * @param {HTMLElement} el
 *        a DOM target whose text content will be modified at regular intervals
 */
export const cycleTitleText = el => {
  const text = [
    'JavaScript engineer',
    'team player',
    'functional developer',
    'creative',
    'Pythonista',
    'problem solver',
    'teacher',
    'Clojurian',
    'fullstack developer',
    'Rustacean',
    'maker',
    'go-to developer',
    'Haskellite',
    'dedicated colleague',
  ];

  let i = 0;

  /**
   * Updates the text content of user target, from parent function scope.
   * @param {HTMLElement} el
   *        a DOM target whose text content will be modified
   */
  const updateTextContent = el =>
    el.textContent = `${text[i++ % text.length]}.`;

  /**
   * A callback function to be run on fade transition completion,
   * executes a series of imperatively declared function invocations.
   */
  const onFadeOutComplete = () => {
    updateTextContent(el);
    fade('in', 600, el);
  };

  setInterval(() => fade('out', 600, el, onFadeOutComplete), 2000);
};


const isHomeRoute = (window.location.pathname === '/' &&
                     window.location.pathname.length === 1);

export const openSidebarAtHomeRoute = el =>
  isHomeRoute ? el.checked = true : el.checked = false;

export const toggleSidebar = (toggle, sidebar, sidebarCheckbox) => {
  document.addEventListener('click', e => {
    (!sidebarCheckbox.checked ||
     sidebar.contains(e.target) ||
     (e.target === sidebarCheckbox || e.target === toggle)) ?
    noop()
    : sidebarCheckbox.checked = false;
  });
};
