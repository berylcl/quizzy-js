import './style.css';
/* eslint-disable */
const form = document.querySelector('form');
const questions = document.querySelectorAll('.question');
const correctAnswer = ['A', 'D', 'B', 'B', 'A'];
const results = document.querySelector('.results');
const scored = document.querySelector('.scored');
const reload = document.querySelector('.reload');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('----');

  let score = 0;
  const userAnswers = [form.question1.value, form.question2.value, form.question3.value, form.question4.value, form.question5.value];
  console.log(userAnswers);
  questions.forEach((question, i) => {
    if (userAnswers[i] === correctAnswer[i]) {
      question.classList.add('correct');
      score += 1;
    } else {
      question.classList.add('wrong');
    }
  });
  scrollTo(0, 0);
  results.classList.remove('hidden');
  scored.textContent = `You scored ${score}/5`;
  reload.addEventListener('click', () => {
    location.reload();
  });
});
