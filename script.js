import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB35qMJDQnoLca6qHcPSSUqEKt95ag_HUg",
    authDomain: "polls-main.firebaseapp.com",
    projectId: "polls-main",
    storageBucket: "polls-main.firebasestorage.app",
    messagingSenderId: "128198848146",
    appId: "1:128198848146:web:6589b926bb0ade7626804b",
    measurementId: "G-QCTQD3HZ60"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

let currentQuestion = 1;
let score = 0;
const totalQuestions = 10;

function submitPoll() {
    score = 0;
    const questions = document.querySelectorAll('input[type="radio"]:checked');
    
    questions.forEach((question) => {
        score += parseInt(question.value);
    });

    document.getElementById("poll-form").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `Ваш результат: ${score}`;
}

function showQuestion() {
    document.getElementById("question").textContent = `Вопрос ${currentQuestion}`;
}

function nextQuestion() {
    if (document.querySelector(`input[name="q${currentQuestion}"]:checked`)) {
        currentQuestion++;
        if (currentQuestion > totalQuestions) {
            showResult();
        } else {
            showQuestion();
        }
    } else {
        alert("Выберите ответ перед переходом!");
    }
}

function showResult() {
    document.querySelector(".poll-questions").style.display = "none";
    document.querySelector(".poll-result").style.display = "block";
    document.getElementById("result").textContent = score;
}

function resetPoll() {
    document.querySelector(".poll-result").style.display = "none";
    document.querySelector(".poll-list").style.display = "block";
    currentQuestion = 1;
    score = 0;
}

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const menu = document.getElementById("side-menu");
    
    if (menuButton) {
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("open");
        });
    }
    
    const registerForm = document.querySelector("#register-form");
    const loginForm = document.querySelector("#login-form");
    
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            registerUser(
                document.getElementById("username").value,
                document.getElementById("email").value,
                document.getElementById("password").value
            );
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            loginUser(
                document.getElementById("email").value,
                document.getElementById("password").value
            );
        });
    }
});

async function registerUser(username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Регистрация успешна!");
        console.log("Пользователь зарегистрирован:", userCredential.user);
    } catch (error) {
        alert("❌ Ошибка регистрации: " + error.message);
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Вход выполнен!");
        window.location.href = "profile.html";
    } catch (error) {
        alert("❌ Ошибка входа: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("side-menu");

  if (menuButton && menu) {
      menuButton.addEventListener("click", () => {
          menu.classList.toggle("open");
      });
  } else {
      console.error("Ошибка: Кнопка меню или боковое меню не найдены!");
  }
});

