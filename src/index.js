import Stopwatch, { IDLE, PAUSED, ACTIVE, STOPPED } from './Stopwatch';

const $time = document.querySelector('.js-time');
const $start = document.querySelector('.js-start');
const $reset = document.querySelector('.js-reset');
const $pause = document.querySelector('.js-pause');
const $resume = document.querySelector('.js-resume');

const onProgress = remain => {
  $time.innerText = remain.toFixed(3);
};

const onStatusChange = status => {
  switch (status) {
    case IDLE:
      $start.hidden = false;
      $pause.hidden = true;
      $reset.hidden = false;
      $resume.hidden = true;
      break;
    case PAUSED:
      $start.hidden = true;
      $pause.hidden = true;
      $reset.hidden = false;
      $resume.hidden = false;
      break;
    case STOPPED:
      $start.hidden = true;
      $pause.hidden = true;
      $reset.hidden = false;
      $resume.hidden = true;
      break;
    case ACTIVE:
      $start.hidden = true;
      $pause.hidden = false;
      $reset.hidden = true;
      $resume.hidden = true;
      break;
    default:
      throw new Error(`Unexpected status: ${status}`);
  }
};

const stopwatch = new Stopwatch(60, { onProgress, onStatusChange });

$start.addEventListener('click', () => {
  stopwatch.start();
});
$pause.addEventListener('click', () => {
  stopwatch.pause();
});
$resume.addEventListener('click', () => {
  stopwatch.start();
});
$reset.addEventListener('click', () => {
  stopwatch.reset();
});
