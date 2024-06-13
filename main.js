import * as ship from './js/ship.js'

// массив с доступными кораблями
const availableShips = [
  'cr90 corvette',
  'x-wing',
  'y-wing',
  'imperial shuttle',
  'millennium falcon',
  'star destroyer',
  'slave 1',
  'republic cruiser',
  'naboo fighter',
  'naboo royal starship',
]
const space = document.querySelector('.space')
const bgMusic = document.querySelector('#backgroundMusic')
const overlay = document.querySelector('.overlay')
const logo = document.querySelector('.logo')

document.body.onclick = function () {
  // запускаем музыку(браузер предотвращает autoplay, поэтому по клику запускаю), и интро
  bgMusic.play()
  new Promise((r) => {
    const interval = setInterval(() => {
      // с интервалом 200 милисек меняем прозрачность логотипа
      logo.style.opacity = Number(logo.style.opacity) + 0.05
      if (logo.style.opacity >= 1) {
        clearInterval(interval)
        r()
      }
    }, 200)
  })
    .then(() => {
      // пауза в 3 сек, чтобы насладиться логотипом
      return new Promise((r) => {
        setTimeout(() => {
          r()
        }, 3000)
      })
    })
    .then(() => {
      // постепенно уменьшаем прозрачность до 0, при 0 скрываем лого и затемнение
      return new Promise((r) => {
        const interval = setInterval(() => {
          logo.style.opacity = Number(logo.style.opacity) - 0.05
          if (logo.style.opacity <= 0) {
            clearInterval(interval)
            logo.classList.add('none')
            overlay.classList.add('none')
            r()
          }
        }, 200)
      })
    })
    .then(() => {
      getStarWarsData()
    })
}

/*
Так как на api starwars не было особо полезной информации, то решил сделать банальную вещь,
получить названия кораблей и по этим названиям в дальнейшем устанавливать картинки в img тег
*/
async function getStarWarsData() {
  // итоговые массив с отфильтрофанными кораблями и с моей версией объекта Ship
  const shipsArray = []
  /*
    массив состоящий из объектов, каждый из которых - отдельная страница с массивом объектов кораблей
    зачем они разбили данные на страницы - не знаю, моя задача была - объединить даные в один массив
  */
  const dataArray = []
  let data = await fetch('https://swapi.dev/api/starships')
  let json = await data.json()
  // добавляем данные с первой страницы
  dataArray.push(json['results'])
  /*
    проверяем есть ли следующая страница, если да, то снова делаем запрос,
    получаем данные, извлекаем необходимое и закидываем в общий массив
  */
  while (json['next'] !== null) {
    data = await fetch(json['next'])
    json = await data.json()
    dataArray.push(json['results'])
  }
  /*
    создаю новый объединенный массив из всех обектов кораблей со всех страниц
    и тут же фильтрую их по кораблям, для которых уже имеются картинки
  */
  const concatArray = [].concat(...dataArray).filter((ship) => {
    return availableShips.includes(ship['name']?.toLowerCase())
  })
  for (let shipData of concatArray) {
    shipsArray.push(
      new ship.Ship(
        shipData['name'],
        `./ships-img/${shipData['name']
          .toLowerCase()
          .split(' ')
          .join('-')}.png`,
        ship.getShipSize(shipData['name']),
        ship.getShipSpeed(shipData['name'])
      )
    )
  }
  startTheShow(shipsArray)
}
// запускаем все это добро
function startTheShow(shipsArray) {
  setInterval(() => {
    // запускаем создание корабля с интервалом 500 миллисек - 2.5 сек
    ship.createRandomeShip(shipsArray, space)
  }, Math.floor(Math.random() * 2000 + 500))
}
