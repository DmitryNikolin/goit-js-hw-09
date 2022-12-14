import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// const {
//   elements: { inputDelay, inputDelayStep, inputAmount },
// } = form;
const inputDelay = document.querySelector('input[name=delay]');
const inputDelayStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const btnStart = document.getElementsByTagName('button');
const fieldWidth = '150px';
const displayBox = 'flex';
const alignStyle = 'flex-start';
const flexDir = 'column';
const marginInterval = '10px';

form.style.display = displayBox;
form.style.flexDirection = flexDir;
form.style.alignItems = alignStyle;
inputDelay.style.display = displayBox;
inputDelay.style.flexDirection = flexDir;
inputDelay.style.alignItems = alignStyle;
inputDelay.style.marginBottom = marginInterval;
inputDelay.style.width = fieldWidth;
inputDelayStep.style.display = displayBox;
inputDelayStep.style.flexDirection = flexDir;
inputDelayStep.style.alignItems = alignStyle;
inputDelayStep.style.marginBottom = marginInterval;
inputDelayStep.style.width = fieldWidth;
inputAmount.style.display = displayBox;
inputAmount.style.flexDirection = flexDir;
inputAmount.style.alignItems = alignStyle;
inputAmount.style.marginBottom = marginInterval;
inputAmount.style.width = fieldWidth;
btnStart[0].style.fontSize = '16px';
btnStart[0].style.fontWeight = '600';
btnStart[0].style.width = fieldWidth;

form.addEventListener('submit', event => {
  event.preventDefault();
  let firstDelay = Number(inputDelay.value);
  let step = Number(inputDelayStep.value);
  let amount = Number(inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    firstDelay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}