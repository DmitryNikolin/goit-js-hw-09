import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let timeInterval = null;
let selectedTime = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
    selectedTime = selectedDates[0];
  },
};

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  dataTimePicker: document.querySelector('#datetime-picker'),
};

// refs.startBtn.disabled = true;

flatpickr(refs.dataTimePicker, options);
const dataPickr = new flatpickr(refs.dataTimePicker, options);

refs.startBtn.addEventListener('click', onStart);
function onStart() {
  refs.startBtn.disabled = true;
  const startTime = dataPickr.selectedDates[0];
  //console.log('startTime',startTime);
  timeInterval = setInterval(() => {
    const currentTime = Date.now();
    //console.log('currentTime', currentTime);
    const deltaTime = selectedTime - currentTime;
    //console.log('deltaTime',deltaTime);
    if (deltaTime <= 0) {
        Notiflix.Notify.success('Success count!');
        refs.startBtn.disabled = false;
        clearInterval(timeInterval);
        return;
    }
    const time = convertMs(deltaTime);

    refs.days.textContent = time.days;
    refs.hours.textContent = time.hours;
    refs.minutes.textContent = time.minutes;
    refs.seconds.textContent = time.seconds;
  }, 1000);
}

function addPrevSymbol(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addPrevSymbol(Math.floor(ms / day));
  console.log('days', days);
  // Remaining hours
  const hours = addPrevSymbol(Math.floor((ms % day) / hour));
  console.log('hours', hours);
  // Remaining minutes
  const minutes = addPrevSymbol(Math.floor(((ms % day) % hour) / minute));
  console.log('minutes', minutes);
  // Remaining seconds
  const seconds = addPrevSymbol(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  console.log('seconds', seconds);

  return { days, hours, minutes, seconds };
}

function onClick() {
  refs.days.innerHTML();
}

Notify.init({
  position: 'center-top',
  closeButton: false,
});
