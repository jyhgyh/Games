const questions = [
  {
    question: "Who is the creator of PHP?",
    responses: [
      "Jack Sparrow", 
      "Rasmus Lerdorf", 
      "Tim Berners-Lee", 
      "Dennis Ritchie"
    ],
    solution: "2"
  },
  {
    question: "When was the first implementation of Blockchain Technology?",
    responses: [
      "2009", 
      "2008", 
      "2000", 
      "1991"
    ],
    solution: "2"
  },
  {
    question: "In which year was the first Playstation made?",
    responses: [
     "1994", 
     "1992", 
     "1990", 
     "1995"
    ],
    solution: "1"
  },
   {
    question: "What does PHP mean today?",
    responses: [
     "PHP: Personal Home Page",
     "PHP: Program High Performance",
     "PHP: Hypertext Preprocessor",
     "PHP: Hypertext Page"
    ],
    solution: "3"
  },
   {
    question: "What is the last Sega console?",
    responses: [
     "Dreamcast", 
     "Saturn", 
     "S-Gage", 
     "Lindbergh"
    ],
    solution: "1"
  },
   {
    question: "What does www stand for?",
    responses: [
    "Web wasabi world",
    "World wide web",
    "Wide web world",
    "Web war song"
    ],
    solution: "2"
  },
   {
    question: "What's the name of the UNIX creator?",
    responses: [
    "Mark Shuttleworth", 
    "Kenneth Thompson",
    "Linus Torvalds",
    "Bill Gates"
    ],
    solution: "2"
  },
  {
    question: "When was Alan Turing born?",
    responses: [
    "1981", 
    "1891", 
    "1934",
    "1912"
    ],
    solution: "4"
  },
  {
    question: "What is the port for HTTP?",
    responses: [
      "70",
      "90",
      "82",
      "80"
    ],
    solution: "4"
  }
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    const currentQuestion = questions[questionIndex];

    const headerTemplate = `<h2 class="title">${currentQuestion.question}</h2>`;
    headerContainer.innerHTML = headerTemplate;

    currentQuestion.responses.forEach((response, index) => {
        const questionTemplate = 
        `<li>
            <label>
                <input value="${index + 1}" type="radio" name="answer" class="answer">
                <span>${response}</span>
            </label>
        </li>`;
        listContainer.innerHTML += questionTemplate;
    });
}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if (!checkedRadio) {
        alert("Please select an answer before proceeding!");
        return;
    }

    const userAnswer = checkedRadio.value;

    if (userAnswer === questions[questionIndex].solution) {
        score++;
    }

    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResult();
    }
}

function showResult() {
    const resultTemplate = `
        <h2 class="title">Quiz Completed</h2>
        <h3 class="summary">Your score is:</h3>
        <p class="result">${score} out of ${questions.length}</p>
        <button class="quiz-submit" id="restart">Restart Quiz</button>
    `;
    headerContainer.innerHTML = resultTemplate;

    const restartBtn = document.querySelector('#restart');
    restartBtn.onclick = restartQuiz;

    submitBtn.style.display = 'none';
}

function restartQuiz() {
    score = 0;
    questionIndex = 0;
    submitBtn.style.display = '';
    clearPage();
    showQuestion();
}
