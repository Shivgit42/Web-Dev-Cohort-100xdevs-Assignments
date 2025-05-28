import { quizData } from "./data.js";

const body = document.querySelector("body");

let currentQuiz = 0;
let score = 0;
let timer;
let TIME_LIMIT = 15;

const quizDiv = document.createElement("div");
quizDiv.className = "quiz-container";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
const progress = document.createElement("div");
progress.className = "progress";
progressBar.appendChild(progress);

const timerDiv = document.createElement("div");
timerDiv.className = "timer";

const queDiv = document.createElement("div");
queDiv.className = "que-container";

const optionContainer = document.createElement("div");
optionContainer.className = "option-container";

const button = document.createElement("button");
button.className = "submit-button";
button.innerText = "Submit";

const resultScore = document.createElement("div");
resultScore.className = "result";

quizDiv.appendChild(progressBar);
quizDiv.appendChild(timerDiv);
quizDiv.appendChild(queDiv);
quizDiv.appendChild(optionContainer);
quizDiv.appendChild(button);
quizDiv.appendChild(resultScore);
body.appendChild(quizDiv);

loadQuiz();

function loadQuiz() {
  resetTimer();
  startTimer();
  // clear previous content
  const currentData = quizData[currentQuiz];
  queDiv.innerText = currentData.question;
  optionContainer.innerHTML = "";

  for (let key of ["a", "b", "c", "d"]) {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = key;

    label.appendChild(radio);
    label.append(`${currentData[key]}`);
    optionContainer.appendChild(label);
  }

  const progressPercent = (currentQuiz / quizData.length) * 100;
  progress.style.width = `${progressPercent}%`;

  button.innerText = "Submit";
  resultScore.innerText = "";
}

function getSelected() {
  const radios = document.querySelectorAll("input[name='answer']");
  for (let radio of radios) {
    if (radio.checked) return radio.value;
  }
  return null;
}

button.addEventListener("click", handleSubmit);

function handleSubmit() {
  clearInterval(timer);

  const selected = getSelected();

  if (selected) {
    const correct = quizData[currentQuiz].correct;

    //highlight
    const labels = optionContainer.querySelectorAll("label");
    labels.forEach((label) => {
      const input = label.querySelector("input");
      const value = input.value;
      if (value === correct) {
        label.classList.add("correct");
      } else if (input.checked && value !== correct) {
        label.classList.add("incorrect");
      }
      input.disabled = true;
    });
    if (selected === correct) {
      score++;
    }

    button.innerText =
      currentQuiz < quizData.length - 1 ? "Next" : "Show Result";
    button.removeEventListener("click", handleSubmit);
    button.addEventListener("click", handleNext);
  } else {
    alert("Please select an answer");
    startTimer();
  }
}

function handleNext() {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    button.removeEventListener("click", handleNext);
    button.addEventListener("click", handleSubmit);
    loadQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  queDiv.style.display = "none";
  optionContainer.style.display = "none";
  timerDiv.style.display = "none";
  progress.style.width = "100%";
  button.innerText = "Reload";
  resultScore.innerText = `🎉 You answered ${score}/${quizData.length} questions correctly`;

  button.onclick = () => window.location.reload();
}

function startTimer() {
  let timeLeft = TIME_LIMIT;
  timerDiv.innerText = `⏱ Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDiv.innerText = `⏱ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up");
      handleSubmit();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerDiv.innerText = "";
}
