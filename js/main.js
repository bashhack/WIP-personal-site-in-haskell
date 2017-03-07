// ============================================================================
// Imports
// ============================================================================

// Import styles (automatically injected into <head>)
import '../css/main.css';

// Import modules
import { printTarget } from './modules/logger';
import { avoidConsoleErrors, doAppInit } from './modules/utils';
import { cycleTitleText, openSidebarAtHomeRoute, toggleSidebar } from './modules/sidebar';
import { constructSkillsList } from './modules/about';

document.addEventListener('DOMContentLoaded', () => {
  // Handle cross-browser console obj methods
  avoidConsoleErrors();

  // Debug
  printTarget.innerText += 'Debug Output:\n\n';

  // DOM Selectors
  const personalDescription = document.getElementById('personal-description');
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarCheckbox = document.getElementById('sidebar-checkbox');
  const skillContainer = document.querySelector('.skill-container');

  // Process pipelines
  const sidebarSeq = () => {
    cycleTitleText(personalDescription);
    openSidebarAtHomeRoute(sidebarCheckbox);
    toggleSidebar(toggle, sidebar, sidebarCheckbox);
  };

  const aboutSeq = () => {
    constructSkillsList(skillContainer);
  };

  const APP = {
    // application-wide code
    common: {
      init: () => sidebarSeq(),
    },

    // controller-wide code
    about: {
      init: () => aboutSeq(),
    },
  };

  // Main
  const main = () => {
    doAppInit(APP);
  };

  main();
});
