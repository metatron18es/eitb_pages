function createAndAddNew(tickerNew, tickerNumber) {
  const ticker = document.querySelector(`#tickerList${tickerNumber}`);
  const li = document.createElement('li');
  li.classList.add('ticker-text');

  const spanTitle = document.createElement('span');
  spanTitle.classList.add('ticker-title');
  spanTitle.innerHTML = tickerNew.title;

  const spanText = document.createElement('span');
  spanText.classList.add('ticker-description');
  spanText.innerHTML = tickerNew.description;

  li.appendChild(spanTitle);
  li.appendChild(spanText);
  ticker.appendChild(li);
}

function loadItems() {
  fetch('https://api.eitb.eus/api/getInfoData/')
    .then(res => res.json())
    .then((res) => {
      const news = res.ticker;
      for (let index = 0; index < news.eu.length; index++) {
        const euNew = news.eu[index];
        const esNew = news.es[index];
        
        createAndAddNew(euNew, 1);
        createAndAddNew(esNew, 1);
        createAndAddNew(euNew, 2);
        createAndAddNew(esNew, 2);
        createAndAddNew(euNew, 3);
        createAndAddNew(esNew, 3);
      }
    })
    .catch( err => console.error(err));
}

function moveToLeft(pos = 0) {
  const ticker1 = document.querySelector('#tickerList1');
  const ticker2 = document.querySelector('#tickerList2');
  const ticker3 = document.querySelector('#tickerList3');
  pos -= 500;
  ticker1.style.left = pos + 'px';
  ticker2.style.left = pos + 'px';
  ticker3.style.left = pos + 'px';
  const tickerClientRect = ticker3.getBoundingClientRect();
  if(tickerClientRect.right < 10000) {
    loadItems();
  }
  setTimeout(moveToLeft, 1000, pos);
}

loadItems();
moveToLeft(6452);