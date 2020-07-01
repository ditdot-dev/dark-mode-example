/*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
    https://github.com/ditdot-dev/dark-mode-example
*/

function load() {
  const switcher = document.querySelector("input");
  const title = document.querySelector(".title");
  const logo = document.querySelector(".logo");

  function calculatePath() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const path = `path("M ${width / 2 - 25}, ${height / 2} m ${
      -width / 2
      }, 0 a ${width / 2},${height / 2} 0 1,0 ${width},0 a ${width / 2},${
      height / 2
      } 0 1,0 ${-width},0z")`;
    return path;
  }

  // MediaQueryList object
  const useDark = window.matchMedia("(prefers-color-scheme: dark)");

  //Checks & uncheks the switcher
  function checkToggle(check) {
    switcher.checked = check;
  }

  // Toggles the "dark-mode" class based on if the media query matches
  function toggleDarkMode(add) {
    checkToggle(add);
    document.body.classList.toggle("dark-mode", add);
    add
      ? ((title.textContent = "Dark mode"),
        (logo.style.offsetPath = calculatePath()))
      : ((title.textContent = "Light mode"), (logo.style.offsetPath = "none"));
  }

  // Initial setting depending on the prefers-color-mode
  toggleDarkMode(useDark.matches);

  // Listen for changes in the OS settings
  useDark.addEventListener("change", (evt) => toggleDarkMode(evt.matches));

  let dark = useDark.matches;

  function switchListener() {
    dark = !dark;
    toggleDarkMode(dark);
  }
  // Listen for switch change
  switcher.addEventListener("change", switchListener);
}

window.addEventListener("DOMContentLoaded", load);
