var startQuizButton = document.getElementById("start-quiz");
var quizContainer = document.getElementById("quiz-container");
var resultContainer = document.getElementById("result-container");
var timerElement = document.getElementById("timer");
var questionText = document.getElementById("question-text");
var choicesElement = document.getElementById("choices");

var questions = [
  {
    question: "Which of the following is a JavaScript comment?",
    choices: [
      "1: <!-- Comment -->",
      "2: // Comment",
      "3: /* Comment */",
      "4: # Comment",
    ],
    answer: 1,
  },
  {
    question: "What is the correct syntax for creating a JavaScript function?",
    choices: [
      "1: function myFunction()",
      "2: function:myFunction()",
      "3: function = myFunction()",
      "4: function-myFunction()",
    ],
    answer: 0,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["1: onmouseover", "2: onchange", "3: onclick", "4: onmouseclick"],
    answer: 2,
  },
  {
    question: "How can you add a comment in a JavaScript?",
    choices: [
      "1: //This is a comment",
      "2: /*This is a comment*/",
      "3: Both of the above",
      "4: None of the above",
    ],
    answer: 2,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["1: *", "2: =", "3: x", "4: -"],
    answer: 1,
  },
];

let currentQuestionIndex = 0;
let timer = 50;
var timerInterval;

startQuizButton.addEventListener("click", startQuiz);

function startQuiz() {
  if (startQuizButton.textContent === "Start Again") {
    resetQuiz();
  }
  startQuizButton.classList.add("hide");
  resultContainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  timerInterval = setInterval(function () {
    timer--;
    timerElement.textContent = "Time: " + timer;
    if (timer <= 0) {
      endQuiz();
    }
  }, 1000);
  displayQuestion();
}

function resetQuiz() {
  startQuizButton.textContent = "Start Quiz";
  currentQuestionIndex = 0;
  timer = 50;
  timerElement.textContent = "Time: " + timer;
  resultContainer.innerHTML = "";
}

function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.classList.add("hide");
  resultContainer.innerHTML = "Quiz completed!";
  resultContainer.classList.remove("hide");
  startQuizButton.textContent = "Start Again";
  startQuizButton.classList.remove("hide");
}

function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  var question = questions[currentQuestionIndex];
  questionText.textContent = question.question;
  choicesElement.innerHTML = "";

  for (let i = 0; i < question.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = question.choices[i];
    choiceButton.addEventListener("click", function () {
      if (i === question.answer) {
        showFeedback("Correct!");
      } else {
        showFeedback("Incorrect!");
        timer -= 10;
      }
      currentQuestionIndex++;
      setTimeout(displayQuestion, 1000);
    });
    choicesElement.appendChild(choiceButton);
  }
}

function showFeedback(message) {
  var feedbackElement = document.createElement("div");
  feedbackElement.textContent = message;
  feedbackElement.classList.add("feedback");

  var borderElement = document.createElement("div");
  borderElement.classList.add("border");

  choicesElement.appendChild(borderElement);
  choicesElement.appendChild(feedbackElement);

  setTimeout(function () {
    feedbackElement.textContent = "";
    choicesElement.removeChild(borderElement);
  }, 1000);
}
