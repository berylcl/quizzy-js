import './style.css';
/* eslint-disable */

const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'; // Trivia API URL with JavaScript category

const form = document.getElementById('quiz-form');
const questionsContainer = document.querySelector('.questions-container');
const results = document.querySelector('.results');
const scoreElement = document.querySelector('.score');
const reloadButton = document.querySelector('.reload');

let questions = [];

// Function to fetch questions from the Trivia API
async function fetchQuestions() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    questions = data.results.map((result) => ({
      text: result.question,
      correctAnswer: result.correct_answer,
      options: [...result.incorrect_answers, result.correct_answer]
    }));
    displayQuestions();
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

// Function to display the questions dynamically
function displayQuestions() {
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = `Question ${index + 1}:`;
    questionElement.appendChild(questionTitle);

    const questionText = document.createElement('p');
    questionText.textContent = question.text;
    questionElement.appendChild(questionText);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('option');
    questionElement.appendChild(optionsContainer);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index + 1}`;
      input.value = String.fromCharCode(65 + optionIndex); // Convert index to A, B, C, D, ...

      label.appendChild(input);
      label.innerHTML += ` ${String.fromCharCode(65 + optionIndex)}. ${option}<br>`; // Add <br> tag after each option
      optionsContainer.appendChild(label);
    });


    questionsContainer.appendChild(questionElement);
  });
}

// Function to calculate the score and show results
function showResults() {
  let score = 0;
  const userAnswers = Array.from(form.elements)
    .filter((element) => element.type === 'radio' && element.checked)
    .map((element) => element.value);
  const totalQuestions = questions.length;
  scoreElement.textContent = score;
  scoreElement.nextElementSibling.textContent = totalQuestions;
  questions.forEach((question, index) => {
    const questionElement = questionsContainer.children[index];
    const selectedOption = questionElement.querySelector(`input[name=question${index + 1}]:checked`);

    if (selectedOption) {
      const selectedAnswer = selectedOption.value;
      if (selectedAnswer === question.correctAnswer) {
        questionElement.classList.add('correct');
        score += 1;
      } else {
        questionElement.classList.add('wrong');
        const correctAnswerLabel = document.createElement('p');
        correctAnswerLabel.classList.add('correct-answer');
        correctAnswerLabel.innerHTML = `Correct answer: ${question.correctAnswer}`;
        questionElement.appendChild(correctAnswerLabel);
      }
    }
  });

  scoreElement.textContent = score;
  results.classList.remove('hidden');
}


// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  showResults();
});

// Event listener for reload button
reloadButton.addEventListener('click', () => {
  location.reload();
});

// Fetch questions when the page loads
fetchQuestions();
