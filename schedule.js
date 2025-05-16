const subjectInput = document.getElementById('subject-input');
const addSubjectBtn = document.getElementById('add-subject-btn');
const scheduleList = document.getElementById('schedule-list');

let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

function saveSubjects() {
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

function renderSubjects() {
  scheduleList.innerHTML = '';
  subjects.forEach((subject, index) => {
    const li = document.createElement('li');
    li.textContent = subject;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.onclick = () => {
      subjects.splice(index, 1);
      saveSubjects();
      renderSubjects();
      updateProgressTopics();
    };
    li.appendChild(delBtn);
    scheduleList.appendChild(li);
  });
}

addSubjectBtn.onclick = () => {
  const subject = subjectInput.value.trim();
  if(subject && !subjects.includes(subject)) {
    subjects.push(subject);
    saveSubjects();
    renderSubjects();
    subjectInput.value = '';
    updateProgressTopics();
  }
};

renderSubjects();
