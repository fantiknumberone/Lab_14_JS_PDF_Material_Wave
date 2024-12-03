import '../css/style.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.querySelector("#download").addEventListener("click", function () {
    // Преобразование текущей страницы в PDF
    html2pdf()
        .from(document.body)
        .save("resume.pdf");
});

// Сохранение состояния редактируемых полей
const editableElements = document.querySelectorAll('.editable');
editableElements.forEach(element => {
    element.addEventListener('input', function () {
        localStorage.setItem(element.innerText.substr(0, 10), element.innerText);
    });
});

// Загрузка сохраненных данных
window.onload = () => {
    editableElements.forEach(element => {
        const savedText = localStorage.getItem(element.innerText.substr(0, 10));
        if (savedText) {
            element.innerText = savedText;
        }
    });
};

// Добавление эффекта "Material Wave"
document.querySelectorAll(".ripple").forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add("ripple-effect");

        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
