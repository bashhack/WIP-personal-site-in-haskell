// ============================================================================
// Imports
// ============================================================================
import R from 'ramda';

// ============================================================================
// About
// ============================================================================

/**
 * Constructs an unordered list of skills to display on `About` page.
 * @param {HTMLElement} el
 *        a DOM target which will serve as the root node of final list
 */
export const constructSkillsList = el => {
  const skills = [
    'JavaScript',
    'Clojure/ClojureScript',
    'Haskell',
    'Python',
    'Flask/Django',
    'Rust',
    'JavaScript',
    'Clojure/ClojureScript',
    'Haskell',
    'Python',
    'Flask/Django',
    'Rust',
  ];

  R.forEach(x => {
    let item = document.createElement('li');
    item.appendChild(document.createTextNode(x));
    el.appendChild(item).classList.add('skill-item');
  }, skills);
};
