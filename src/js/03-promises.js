import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelayEl = document.querySelector('[name="delay"]');
const inputStepEl = document.querySelector('[name="step"]');
const inputAmountEl = document.querySelector('[name="amount"]');
const btnSubmitEl = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position: position, delay: delay });
      } else {
        // Reject
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

const onSabmit = evt => {
  evt.preventDefault();

  let firstDelay = Number(inputDelayEl.value);
  let delayStep = Number(inputStepEl.value);

  for (let i = 0; i < inputAmountEl.value; i += 1) {
    createPromise(1 + i, firstDelay + i * delayStep)
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
  }
  form.reset();
};

btnSubmitEl.addEventListener('click', onSabmit);
