const hoursLearnedSpan = document.getElementById('hours-learned');
const topicsCompletedSpan = document.getElementById('topics-completed');
const resetProgressBtn = document.getElementById('reset-progress-btn');

let progress = JSON.parse(localStorage.getItem('progress')) || { hours: 0, topics: 0 };

function saveProgress() {
  localStorage.setItem('progress', JSON.stringify(progress));
  renderProgress();
}

function renderProgress() {
  hoursLearnedSpan.textContent = progress.hours.toFixed(2);
  topicsCompletedSpan.textContent = progress.topics;
}

function addLearnedHour(h) {
  progress.hours += h;
  saveProgress();
}

function updateProgressTopics() {
  progress.topics = subjects.length;
  saveProgress();
}

resetProgressBtn.onclick = () => {
  if(confirm('Yakin ingin reset progress?')) {
    progress = { hours: 0, topics: subjects.length };
    saveProgress();
  }
};

renderProgress();
updateProgressTopics();
