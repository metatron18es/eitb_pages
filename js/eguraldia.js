function fetchJSON(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function generateList(data) {
  const list = document.querySelector('.map');

  data.forEach(item => {
    const posX = (parseFloat(item.x) * 2) - 100;
    const posY = (parseFloat(item.y) * 2) - 100;

    const li = document.createElement('li');

    li.classList.add('weather-point');
    li.style.position = 'absolute';
    li.style.left = `${posX}px`;
    li.style.top = `${posY}px`;
    li.style.animationDelay = `${(Math.random() * 1).toFixed(2)}s`;

    const img = document.createElement('img');
    img.src = `./img/icons/${item.name}.png`;
    img.classList.add('weather-icon');
    img.onerror = () => img.style.display = 'none';

    li.appendChild(img);
    list.appendChild(li);
  });
}


function getWeather() {
  fetchJSON('https://hodeia.eitb.eus/datuak/json/ticker_eguraldia/mapa_eguraldia.json')
    .then(data => {
      const weatherPoints = data.data;
      const generatedList = generateList(weatherPoints);
    });
}

function getBilbaoWeather() {
  fetch('https://api.eitb.eus/api/getInfoData/')
    .then(res => res.json())
    .then((res) => {
      const weather = res.weather.eu;
      const currentBilbaoTemp = weather.currentWeather.Bilbo.value

      document.querySelector('#currentBilbao').innerHTML = `${currentBilbaoTemp}&deg;`;
      document.querySelector('.clock_zone').classList.add('show');
    })
    .catch( err => console.error(err));
}