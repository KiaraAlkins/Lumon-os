import { relogioInterval } from "./main.js";

const sectionFirstScreen = document.getElementById('fisrtscreensection');
const passwordScreen = document.getElementById('passwordscreen')

setTimeout(() => {
    passwordScreen.classList.add('fade-in');
    setTimeout(() => {
        sectionFirstScreen.classList.add('fade-out');
    }, 100);
}, 5000)

// Relógio digital de canto na tela inicial

export function atualizarTempo() {
    const displayHorario = document.getElementById('inicialscr-horario');
    const displayData = document.getElementById('inicialscr-data');
    const displayAno = document.getElementById('inicialscr-ano');

    const agora = new Date();
    const horario = corrigirHorario(agora.getHours()) + ':' + corrigirHorario(agora.getMinutes());

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    const dia = agora.getDate();
    const mes = meses[agora.getMonth()];
    const ano = agora.getFullYear();

    const data = dia + " de " + mes

    displayAno.textContent = ano
    displayData.textContent = data
    displayHorario.textContent = horario
}

function corrigirHorario(number) {
    if (number < 10) {
        number = '0' + number
    }
    return number
}

// Senha de acesso

let password = "KierEagan";

const inputPassword = document.querySelector('.typePassword');
const submitButton = document.querySelector('.submitButton');
const blackScreen = document.querySelector('.blackScreen');
const desktopScreen = document.querySelector('.mainDesktop');

submitButton.addEventListener('click', () => {
    if (inputPassword.value === password) {
        blackScreen.classList.add('fade-in');
        setTimeout(() => {
            passwordScreen.classList.remove('fade-in');
            passwordScreen.classList.add('fade-out');
        }, 100);
        setTimeout(() => {
            passwordScreen.remove();
            clearInterval(relogioInterval);
        }, 1000)
        setTimeout(() => {
            blackScreen.classList.remove('fade-in')
            blackScreen.classList.add('fade-out')
            setTimeout(() => {
                desktopScreen.classList.add('fade-in')
                blackScreen.remove()
            })
        }, 2000)
    }
})


