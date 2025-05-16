const startFocusBtn = document.getElementById('start-focus-btn');
const stopFocusBtn = document.getElementById('stop-focus-btn');
const focusTimerDisplay = document.getElementById('focus-timer');
const ambientSound = document.getElementById('ambient-sound');

let focusInterval = null;
let focusTime = 25 * 60; // detik

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startFocus() {
  startFocusBtn.disabled = true;
  stopFocusBtn.disabled = false;
  ambientSound.play();
  focusTime = 25 * 60;
  focusTimerDisplay.textContent = formatTime(focusTime);

  focusInterval = setInterval(() => {
    focusTime--;
    focusTimerDisplay.textContent = formatTime(focusTime);
    if(focusTime <= 0) {
      clearInterval(focusInterval);
      ambientSound.pause();
      alert('Waktu fokus selesai! Istirahat sebentar ya 😊');
      startFocusBtn.disabled = false;
      stopFocusBtn.disabled = true;
      addLearnedHour(0.42); // Tambah 25 menit = 0.42 jam ke progress
    }
  }, 1000);
}

function stopFocus() {
  clearInterval(focusInterval);
  ambientSound.pause();
  startFocusBtn.disabled = false;
  stopFocusBtn.disabled = true;
  focusTimerDisplay.textContent = formatTime(25 * 60);
}

startFocusBtn.onclick = startFocus;
stopFocusBtn.onclick = stopFocus;
