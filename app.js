const sectionFirstScreen = document.getElementById('fisrtscreensection');
const passwordScreen = document.getElementById('passwordscreen')

setTimeout(() => {
    passwordScreen.classList.add('fade-in');
    setTimeout(() => {
        sectionFirstScreen.classList.add('fade-out');
    }, 100);
}, 5000)

// teste de commit