const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
btnStartEl.addEventListener('click', onStart);
btnStopEl.addEventListener('click', onStop);

function onStart(evt) {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop(evt) {
  btnStopEl.disabled = true;
  btnStartEl.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
