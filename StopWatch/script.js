const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const pause = document.querySelector('.pause');

const millisecond = document.querySelector('#millisecond');
const second = document.querySelector('.second');
const minute = document.querySelector('.minute');
const hour = document.querySelector('.hour');

let millisec = 0;
let sec = 0;
let min = 0;
let hr = 0;

let time;
let isRunning = false;

function setTimer() {
    millisec += 10;

    if (millisec >= 1000) {
        millisec = 0;
        sec++;
    }

    if (sec >= 60) {
        sec = 0;
        min++;
    }

    if (min >= 60) {
        min = 0;
        hr++;
    }

    millisecond.textContent = (millisec % 100).toString().padStart(2, '0');
    second.textContent = sec.toString().padStart(2, '0');
    minute.textContent = min.toString().padStart(2, '0');
    hour.textContent = hr.toString().padStart(2, '0');
}

/* START */
start.addEventListener('click', () => {
    if (!isRunning) {
        time = setInterval(setTimer, 10);
        isRunning = true;
    }
});

/* PAUSE / RESUME */
pause.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(time);
        isRunning = false;
    } else {
        time = setInterval(setTimer, 10);
        isRunning = true;
    }
});
