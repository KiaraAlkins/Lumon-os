const initialClock_time = document.querySelector('.desktopClock h2');
const initialClock_date = document.querySelector('.desktopClock p');
const diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const meses = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const agora = new Date();

const diaSemanaHoje = diasSemana[agora.getDay()];
const diaNumericoHoje = agora.getDate();
const mesesHoje = meses[agora.getMonth()];
const horario = corrigirHorario(agora.getHours()) + ':' + corrigirHorario(agora.getMinutes());

function corrigirHorario(number) {
    if (number < 10) {
        number = '0' + number
    }
    return number
}

initialClock_date.textContent = `${diaSemanaHoje}, ${mesesHoje} ${diaNumericoHoje}`
initialClock_time.textContent = horario

// const { exec } = require('child_process');

// exec('netsh wlan show interfaces', (err, stdout) => {
//     console.log(stdout);
// });

// utilizar este comando no electron ou no node para pegar as informações da rede, não funciona no navegador


// API DE CLIMA E LOCALIZAÇÃO

const apiKey_weather = '93b1ea36f3c0761728b2e921fa630122'; // Chave de api de clima


function atualizarClimaELocalizacao() {

    async function pegarCidade(lat, lon) {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`); // URL para busca de localização a partir de LAT e LON
        const data = await response.json(); 
    
        return (data.address.suburb || data.address.city || data.address.town); // RETORNARÁ LOCALIZAÇÃO ATUAL
    }
    
    navigator.geolocation.getCurrentPosition(
        async(position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            const cidade = await pegarCidade(latitude, longitude)
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey_weather}&units=metric&lang=pt_br`);
    
            const dataJson = await response.json();
    
            if (dataJson.cod === 200) {
                mostrarInformacoes({
                    city: dataJson.name,
                    country: dataJson.sys.country,
                    temp: dataJson.main.temp,
                    tempMax: dataJson.main.temp_max,
                    tempMin: dataJson.main.temp_min,
                    description: dataJson.weather[0].description,
                    tempIcon: dataJson.weather[0].icon,
                    windSpeed: dataJson.wind.speed,
                    humidity: dataJson.main.humdity,
                })
            }
        },
        (error) => {
            console.log('Erro:', error.message);
        }
    );
    
    function mostrarInformacoes(json) {
        // IRÁ ALTERAR AS INFORMAÇÕES EM TEMPO REAL DE CLIMA 
        document.querySelector('.text-temperature').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}°`;
        document.querySelector('.cidadeTemp').innerHTML = `${json.city}`;
        document.querySelector('#descriptionTemp').innerHTML = `${json.description}`;
        document.querySelector('#higherlowerTemp').innerHTML = `H: ${json.tempMax.toFixed().toString()}° L: ${json.tempMin.toFixed().toString()}`
    }
}

atualizarClimaELocalizacao();
setInterval(atualizarClimaELocalizacao, 300000);


