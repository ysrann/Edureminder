const flashcardQuestionInput = document.getElementById('flashcard-question');
const flashcardAnswerInput = document.getElementById('flashcard-answer');
const addFlashcardBtn = document.getElementById('add-flashcard-btn');
const flashcardList = document.getElementById('flashcard-list');

let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

function saveFlashcards() {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function renderFlashcards() {
  flashcardList.innerHTML = '';
  flashcards.forEach((card, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Q:</strong> ${card.question} <br> <strong>A:</strong> ${card.answer}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.onclick = () => {
      flashcards.splice(index, 1);
      saveFlashcards();
      renderFlashcards();
    };
    li.appendChild(delBtn);
    flashcardList.appendChild(li);
  });
}

addFlashcardBtn.onclick = () => {
  const question = flashcardQuestionInput.value.trim();
  const answer = flashcardAnswerInput.value.trim();
  if(question && answer) {
    flashcards.push({ question, answer, mastered: false });
    saveFlashcards();
    renderFlashcards();
    flashcardQuestionInput.value = '';
    flashcardAnswerInput.value = '';
  }
};

renderFlashcards();
