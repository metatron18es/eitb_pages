function generateIconUrl(iconPath) {
  const iconParams = iconPath.split('/');
  return `./img/icons/${iconParams[iconParams.length - 1]}`;
}

function setBilbaoWeather(weather) {
  console.log(weather);
  const weatherDays = Object.values(weather.forecast);
  const weatherBilbaoInfo = {
    today: {
      icon: generateIconUrl(weatherDays[0].Bilbo.iconPath),
      max: weatherDays[0].Bilbo.max,
      min: weatherDays[0].Bilbo.min,
    },
    tomorrow: {
      icon: generateIconUrl(weatherDays[1].Bilbo.iconPath),
      max: weatherDays[1].Bilbo.max,
      min: weatherDays[1].Bilbo.min,
    },
  };
  if (weatherDays[2]) {
    weatherBilbaoInfo.next = {
      icon: generateIconUrl(weatherDays[2].Bilbo.iconPath),
      max: weatherDays[2].Bilbo.max,
      min: weatherDays[2].Bilbo.min,
    };
  } else {
    weatherBilbaoInfo.next = weatherBilbaoInfo.tomorrow;
  }

  document.querySelector('#todayIcon').src = weatherBilbaoInfo.today.icon;
  document.querySelector('#todayMaxTemp').innerHTML = `${weatherBilbaoInfo.today.max}º`;
  document.querySelector('#todayMinTemp').innerHTML = `${weatherBilbaoInfo.today.min}º`;
  document.querySelector('#locBilbaoIcon').src = weatherBilbaoInfo.today.icon;
  document.querySelector('#locBilbaoMax').innerHTML = `${weatherBilbaoInfo.today.max}º`;
  document.querySelector('#locBilbaoMin').innerHTML = `${weatherBilbaoInfo.today.min}º`;

  document.querySelector('#tomorrowIcon').src = weatherBilbaoInfo.tomorrow.icon;
  document.querySelector('#tomorrowMaxTemp').innerHTML = `${weatherBilbaoInfo.tomorrow.max}º`;
  document.querySelector('#tomorrowMinTemp').innerHTML = `${weatherBilbaoInfo.tomorrow.min}º`;

  document.querySelector('#nextIcon').src = weatherBilbaoInfo.next.icon;
  document.querySelector('#nextMaxTemp').innerHTML = `${weatherBilbaoInfo.next.max}º`;
  document.querySelector('#nextMinTemp').innerHTML = `${weatherBilbaoInfo.next.min}º`;
}

function setDonostiWeather(weather) {
  const weatherDays = Object.values(weather.forecast);

  document.querySelector('#locDonostiIcon').src = generateIconUrl(weatherDays[0].Donostia.iconPath);
  document.querySelector('#locDonostiMax').innerHTML = `${weatherDays[0].Donostia.max}º`;
  document.querySelector('#locDonostiMin').innerHTML = `${weatherDays[0].Donostia.min}º`;
}

function setGasteizWeather(weather) {
  const weatherDays = Object.values(weather.forecast);

  document.querySelector('#locGasteizIcon').src = generateIconUrl(weatherDays[0].Gasteiz.iconPath);
  document.querySelector('#locGasteizMax').innerHTML = `${weatherDays[0].Gasteiz.max}º`;
  document.querySelector('#locGasteizMin').innerHTML = `${weatherDays[0].Gasteiz.min}º`;
}

function setIrunaWeather(weather) {
  const weatherDays = Object.values(weather.forecast);

  document.querySelector('#locIrunaIcon').src = generateIconUrl(weatherDays[0].Iruña.iconPath);
  document.querySelector('#locIrunaMax').innerHTML = `${weatherDays[0].Iruña.max}º`;
  document.querySelector('#locIrunaMin').innerHTML = `${weatherDays[0].Iruña.min}º`;
}

function getNews() {
  fetch('https://api.eitb.eus/api/getInfoData/')
    .then(res => res.json())
    .then((res) => {
      document.querySelector('#weatherZone').classList.add('animated');
      document.querySelector('#mapZone').classList.add('animated');
      const weather = res.weather.eu;
      const currentBilbaoTemp = weather.currentWeather.Bilbo.value 

      document.querySelector('#currentBilbao').innerHTML = `${currentBilbaoTemp}º`;
      setBilbaoWeather(weather);
      setDonostiWeather(weather);
      setGasteizWeather(weather);
      setIrunaWeather(weather);
    })
    .catch( err => console.error(err));
}