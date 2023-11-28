const apiUrl = "http://localhost:3000/players";
const myMain$$ = document.getElementById('myMain');
const myBody$$ = document.querySelector('.container-all');

async function getData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    } else {
      const dataPlayers = await response.json();
      makePlayerCard(dataPlayers);
    }
  } catch (error) {
    console.error(error);
  }
}
getData();

async function makePlayerCard(dataPlayers) {
  try {
    for (let player of dataPlayers) {
      const playerCard = {
        nombre: player.nombre,
        edad: player.edad,
        posicion: player.posicion,
        nacionalidad: player.nacionalidad,
        liga: player.liga,
        retirado: player.retirado,
        id: player._id,
        ligaInfo: player.ligaInfo
      };
      await drawPlayerCard(playerCard);
      if (!playerCard.retirado) {
        await makeLeagueModel(playerCard);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function drawPlayerCard(playerCard) {
  const sectionCard$$ = document.createElement('section');
  sectionCard$$.classList.add('container-info');

  const divPlayer$$ = document.createElement('div');
  divPlayer$$.classList.add('container__player');

  const namePlayer$$ = document.createElement('h3');
  namePlayer$$.textContent = playerCard.nombre;
  divPlayer$$.appendChild(namePlayer$$);

  const listDataPlayer$$ = document.createElement('ul');

  const listItemAge$$ = document.createElement('li');
  listItemAge$$.textContent = 'Edad: ';
  const listItemAgeSpan$$ = document.createElement('span');
  listItemAgeSpan$$.textContent = playerCard.edad;
  listItemAge$$.appendChild(listItemAgeSpan$$);
  listDataPlayer$$.appendChild(listItemAge$$);

  const listItemPosition$$ = document.createElement('li');
  listItemPosition$$.textContent = 'Posición: ';
  const listItemPositionSpan$$ = document.createElement('span');
  listItemPositionSpan$$.textContent = playerCard.posicion;
  listItemPosition$$.appendChild(listItemPositionSpan$$);
  listDataPlayer$$.appendChild(listItemPosition$$);

  const listItemNationality$$ = document.createElement('li');
  listItemNationality$$.textContent = 'Nacionalidad: ';
  const listItemNationalitySpan$$ = document.createElement('span');
  listItemNationalitySpan$$.textContent = playerCard.nacionalidad;
  listItemNationality$$.appendChild(listItemNationalitySpan$$);
  listDataPlayer$$.appendChild(listItemNationality$$);

  const listItemLeague$$ = document.createElement('li');
  listItemLeague$$.setAttribute('data-id', playerCard.id);
  listItemLeague$$.textContent = 'Liga: ';
  const listItemLeagueSpan$$ = document.createElement('span');
  listItemLeagueSpan$$.textContent = playerCard.liga;
  listItemLeague$$.appendChild(listItemLeagueSpan$$);
  listDataPlayer$$.appendChild(listItemLeague$$);

  const listItemRetired$$ = document.createElement('li');
  if(playerCard.retirado) {
    listItemRetired$$.textContent = 'Retirado: ';
    const listItemRetiredSpan$$ = document.createElement('span');
    listItemRetiredSpan$$.textContent = 'Sí';
    listItemRetired$$.appendChild(listItemRetiredSpan$$);
    listItemLeague$$.remove();
  } else {
    listItemRetired$$.textContent = 'Retirado: ';
    const listItemRetiredSpan$$ = document.createElement('span');
    listItemRetiredSpan$$.textContent = 'No';
    listItemRetired$$.appendChild(listItemRetiredSpan$$);
    listItemLeagueSpan$$.classList.add('transform-hover');
  }
  listDataPlayer$$.appendChild(listItemRetired$$);

  divPlayer$$.appendChild(listDataPlayer$$);
  sectionCard$$.appendChild(divPlayer$$);
  myMain$$.appendChild(sectionCard$$);
}

async function makeLeagueModel(playerCard) {
  try {
    const dataLiga = {
      nombre: playerCard.ligaInfo.nombre,
      pais: playerCard.ligaInfo.pais,
      equipos: playerCard.ligaInfo.numeroEquipos,
      fundacion: playerCard.ligaInfo.fundacion,
      id: playerCard.ligaInfo
    };
    await drawLeagueCard(dataLiga, playerCard.id);
  } catch (error) {
    console.error(error);
  }
}

async function drawLeagueCard(dataLiga, playerId) {
  const listItemLeague$$ = document.querySelector(`[data-id="${playerId}"]`);
  if (listItemLeague$$) {
    const sectionContainer$$ = listItemLeague$$.closest('.container-info');
    const divLeague$$ = document.createElement('div');
    divLeague$$.classList.add('container__league');

    const btnToCloseDivLeague = document.createElement('button');
    const imgBtnToClose = document.createElement('img');
    imgBtnToClose.src = "./assets/cross.png";
    btnToCloseDivLeague.appendChild(imgBtnToClose);
    divLeague$$.appendChild(btnToCloseDivLeague);

    const listDataLeague$$ = document.createElement('ul');

    const listItemName$$ = document.createElement('li');
    listItemName$$.textContent = 'Nombre: ';
    const listItemSpanName$$ = document.createElement('span');
    listItemSpanName$$.textContent = dataLiga.nombre;
    listItemName$$.appendChild(listItemSpanName$$);
    listDataLeague$$.appendChild(listItemName$$);

    const listItemCountry$$ = document.createElement('li');
    listItemCountry$$.textContent = 'País: ';
    const listItemSpanCountry$$ = document.createElement('span');
    listItemSpanCountry$$.textContent = dataLiga.pais;
    listItemCountry$$.appendChild(listItemSpanCountry$$);
    listDataLeague$$.appendChild(listItemCountry$$);

    const listItemTeams$$ = document.createElement('li');
    listItemTeams$$.textContent = 'Nº de equipos: ';
    const listItemSpanTeams$$ = document.createElement('span');
    listItemSpanTeams$$.textContent = dataLiga.equipos;
    listItemTeams$$.appendChild(listItemSpanTeams$$);
    listDataLeague$$.appendChild(listItemTeams$$);

    const listItemFoundation$$ = document.createElement('li');
    listItemFoundation$$.textContent = 'Año de fundación: ';
    const listItemSpanFoundation$$ = document.createElement('span');
    listItemSpanFoundation$$.textContent = dataLiga.fundacion;
    listItemFoundation$$.appendChild(listItemSpanFoundation$$);
    listDataLeague$$.appendChild(listItemFoundation$$);

    divLeague$$.appendChild(listDataLeague$$);
    sectionContainer$$.appendChild(divLeague$$);

    listItemLeague$$.addEventListener('click', function() {
      showLeagueCard(divLeague$$);
    })

    btnToCloseDivLeague.addEventListener('click', function() {
      hideLeagueCard(divLeague$$);
    })
  }
}

async function showLeagueCard(divLeague$$) {
  divLeague$$.classList.toggle('show');
}

async function hideLeagueCard(divLeague$$) {
  divLeague$$.classList.remove('show');
}