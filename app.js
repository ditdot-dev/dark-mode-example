const doc = document.documentElement;
const body = document.querySelector("body");
const background = document.querySelector(".background");

const input = document.querySelector("input");
const title = document.querySelector(".title");
const head = document.querySelector(".head");
const modeLabel = document.querySelector(".mode-label");
const logo = document.querySelector(".logo");

class ChangeTheme {
  constructor(elem) {
    this.darkMode = false;
    this.elem = elem;
  }
  handleEvent() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      let width = window.innerWidth;
      let path = `path("M ${width / 2}, ${width / 2} m ${-width / 2}, 0 a ${
        width / 2
      },${width / 2} 0 1,0 ${width},0 a ${width / 2},${
        width / 2
      } 0 1,0 ${-width},0z")`;
      this.elem.style.filter = "invert(100%)";
      title.textContent = "Dark mode";
      logo.classList.add("animate");
      head.classList.add("rotating");
      background.classList.add("stars");
      modeLabel.style.visibility = "hidden";
      logo.style.offsetPath = path;
    } else {
      this.elem.style.filter = "none";
      title.textContent = "Light mode";
      logo.classList.remove("animate");
      head.classList.remove("rotating");
      background.classList.remove("stars");
      modeLabel.style.visibility = "visible";
      logo.style.offsetPath = null;
    }
  }
}
/* Call class constructor with element you want to apply dark mode on (doc, body, background) */
const listener = new ChangeTheme(body);

export default input.addEventListener("change", listener);
