const categories = {
  politica: {
    es: "política",
    eu: "politika"
  },
  economia: {
    es: "economía",
    eu: "ekonomia"
  },
  sociedad: {
    es: "sociedad",
    eu: "gizartea"
  },
} 

function getNews(language='es') {
  fetch('https://api.eitb.eus/api/getInfoData/')
    .then(res => res.json())
    .then((res) => {
      const newsPosition = 0;
      const actualNew = res.infoData[language][newsPosition];
      const category = actualNew.category.split(',')[1];
      let catSubtitle = category;
      if(categories[category]) {
        catSubtitle = categories[category][language];
      }
      let imgSrc = actualNew.image;
      if(imgSrc === null) {
        let otherLanguage = 'eu';
        if (language === 'eu') {
          otherLanguage = 'es';
        }
        imgSrc = res.infoData[otherLanguage][newsPosition].image;
      }

      document.querySelector('.cat-subtitle').innerHTML = catSubtitle;
      document.querySelector('.pretitle').innerHTML = actualNew.pretitle;
      document.querySelector('.headline').innerHTML = actualNew.headline;
      document.querySelector('.img').setAttribute('src', imgSrc);
    })
    .catch( err => console.error(err));
}