/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
    https://github.com/ditdot-dev/dark-mode-example
*/

function load() {
  "use strict";

  const switcher = document.querySelector("input");
  const title = document.querySelector(".title");
  const logo = document.querySelector(".logo");

  String.prototype.format = function() {
    let formatted = this;
    
    for (let i = 0; i < arguments.length; i++) {
        let regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }

    return formatted;
  };

  function calculatePath() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const path =
      'path("M {0}, {1} m -{2}, 0 a {2}, {1} 0 1, 0 {3}, 0 a {2}, {1} 0 1,0 -{3}, 0z")'.format(
        width / 2 - 25,
        height / 2,
        width / 2,
        width
      );

    return path;
  }

  // Checks & unchecks the switcher
  function checkToggle(check) {
    switcher.checked = check;
  }

  // Toggles the "dark-mode" class based on if the media query matches
  function toggleDarkMode(state) {
    checkToggle(state);

    const hasClass = document.body.classList.contains("dark-mode");
    
    if (state) {
      if (!hasClass) {
        document.body.classList.add("dark-mode");
      }

      title.textContent = "Dark mode";
      logo.style.offsetPath = calculatePath();
    } else {
      if (hasClass) {
        document.body.classList.remove("dark-mode");
      }

      title.textContent = "Light mode";
      logo.style.offsetPath = "none";
    }
  }

  // MediaQueryList object
  const useDark = window.matchMedia("(prefers-color-scheme: dark)");
  let darkModeState = useDark.matches;

  // Listen for changes in the OS settings
  // addListener is used because older versions of Safari don't support addEventListener
  useDark.addListener(function(evt) {
    toggleDarkMode(evt.matches);
  });

  // Initial setting depending on the prefers-color-mode
  toggleDarkMode(darkModeState);

  function switchListener() {
    darkModeState = !darkModeState;
    toggleDarkMode(darkModeState);
  }

  // Listen for switch change
  switcher.addEventListener("change", switchListener);
}

document.addEventListener("DOMContentLoaded", load);

/*  Rocket logo animation is based on the CSS Motion Path properties
    (offset-*) which are not supported by Safari browsers.
    A possible solution for animation along a motion path is Greensock
    MotionPathPlugin https://greensock.com/motionpath
*/
