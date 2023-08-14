const timerDisplay = document.querySelector(".timer");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const resetButton = document.getElementById("resetBtn");
const setTimeButton = document.getElementById("setTimeBtn");
const inputTime = document.getElementById("inputTime");

let timer;
let endTime;
let isRunning = false;

function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateTimer() {
  const currentTime = Math.floor(endTime - Date.now() / 1000);

  if (currentTime <= 0) {
    clearInterval(timer);
    isRunning = false;
    timerDisplay.textContent = "00:00:00";
  } else {
    timerDisplay.textContent = formatTime(currentTime);
  }
}

startButton.addEventListener("click", () => {
  if (!isRunning) {
    endTime = Date.now() / 1000 + parseTime(timerDisplay.textContent);
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  timerDisplay.textContent = "00:00:00";
  inputTime.value = "00:00"; 
});

setTimeButton.addEventListener("click", () => {
  if (!isRunning) {
    const inputTimeValue = inputTime.value; 
    const [hours, minutes] = inputTimeValue.split(":").map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      const newTimeInSeconds = hours * 3600 + minutes * 60;

      if (newTimeInSeconds > 0) {
        endTime = Date.now() / 1000 + newTimeInSeconds;
        timerDisplay.textContent = formatTime(newTimeInSeconds);
      }
    }
  }
});
