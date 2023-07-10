import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

document.body.style.backgroundColor = '#ADFF2F';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartEl.disabled = true;
    } else {
      btnStartEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
const onStart = () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputEl.value) - Date.now();

    btnStartEl.disabled = true;

    if (countdown < 0) {
      clearInterval(timer);
      return;
    }

    updateTimer(convertMs(countdown));
  }, 1000);
};
function updateTimer({ days, hours, minutes, seconds }) {
  dataDaysEl.textContent = addLeadingZero(days);
  dataHoursEl.textContent = addLeadingZero(hours);
  dataMinutesEl.textContent = addLeadingZero(minutes);
  dataSecondsEl.textContent = addLeadingZero(seconds);
}
btnStartEl.addEventListener('click', onStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
