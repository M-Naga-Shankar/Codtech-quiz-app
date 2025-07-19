const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answerIndex: 2
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answerIndex: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style System",
      "Computer Style Syntax"
    ],
    answerIndex: 1
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.getElementById("result").classList.add("d-none");
  document.getElementById("quiz-container").classList.remove("d-none");
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "list-group-item list-group-item-action";
    btn.innerText = option;
    btn.dataset.index = index;
    btn.onclick = () => selectAnswer(btn, index);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("next-btn").classList.add("d-none");
}

function selectAnswer(selectedBtn, selectedIndex) {
  const correctIndex = questions[currentQuestion].answerIndex;
  const optionButtons = document.querySelectorAll("#options button");

  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.add("list-group-item-success"); // green
    } else if (btn === selectedBtn && idx !== correctIndex) {
      btn.classList.add("list-group-item-danger"); // red
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  document.getElementById("next-btn").classList.remove("d-none");
  document.getElementById("next-btn").onclick = nextQuestion;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").classList.add("d-none");
  document.getElementById("result").classList.remove("d-none");
  document.getElementById("score").innerText = `You scored ${score} out of ${questions.length}`;
}

window.onload = startQuiz;
