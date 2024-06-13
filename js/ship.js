/*
  В объектах, получаемых с api слишком много ненужных данных,
  создаю свою версию с необходимыми данными
*/

export class Ship {
  // size в пикселях
  // speed скорость в пикселях за каждые 10 миллисек
  constructor(name, imgUrl, size, speed) {
    this.name = name
    this.imgUrl = imgUrl
    this.size = size
    this.speed = speed
  }

  fly(shipImg, direction) {
    // сделал так, ибо внутри setInterval другой контекст и не могу использовать this
    const speed = this.speed
    const size = this.size
    // получаю значение left, убираю px в конце и преобразую в число
    let left = Number(shipImg.style.left.replace('px', ''))
    const interval = setInterval(function () {
      // в зависимости от направления прибавляю или уменьшаю скорость
      // как только корабль заходит за границы видимой области экрана на ширину img корабля, то удаляю его
      if (direction) {
        left -= speed
        if (left <= -size) {
          clearInterval(interval)
          shipImg.remove()
        }
      } else {
        left += speed
        if (left >= window.screen.width + size) {
          clearInterval(interval)
          shipImg.remove()
        }
      }
      // меняю значение, и добаляю px в конце, так как это свойство - строка
      shipImg.style.left = left + 'px'
    }, 10)
  }

  setStartCoordinates(shipImg, direction) {
    /*
      генерируем рандомное значение для оси-y в диапазоне высоты экрана
      - this.size - чтобы корабли появлялись чаще вверху экрана,
      + this.size - чтобы корабли появлялись чаще внизу экрана
    */
    const top = Math.floor(Math.random() * 2)
      ? Math.floor(Math.random() * window.screen.height - this.size)
      : Math.floor(Math.random() * window.screen.height + this.size)
    // проверяем не входит ли картинка за пределы экрана снизу или сверху путем прибавления размера картинки
    if (top + this.size > window.screen.height) {
      shipImg.style.bottom = 0
    } else {
      shipImg.style.top = top < 0 ? 0 : top + 'px'
    }
    // устанавливаем значение для оси-x в зависимости от направления,
    // в случае если корабль стартует справа, то смещаем img на её размер
    shipImg.style.left = direction
      ? window.screen.width + this.size + 'px'
      : -this.size + 'px'
    shipImg.style.left += 'px'
  }
}

export function createRandomeShip(shipsArray, space) {
  // рандомно генерим значение слева или справа корабль начнет полёт
  // 0 - справа, 1 - слева
  const direction = Math.floor(Math.random() * 2)
  // создаем рандомный корабль на базе доступных кораблей
  const randomShip = Object.create(shipsArray[Math.floor(Math.random() * 11)])
  // создаем img
  const shipImg = document.createElement('img')
  shipImg.src = randomShip.imgUrl
  shipImg.style.display = 'block'
  shipImg.style.position = 'absolute'
  // в зависимости от направления делаем разворот картинки
  shipImg.style.transform = direction ? 'unset' : 'rotate(180deg)'
  shipImg.style.width = randomShip.size + 'px'
  space.appendChild(shipImg)
  // устанавливаем координаты корабля и запускаем в долгий путь
  randomShip.setStartCoordinates(shipImg, direction)
  randomShip.fly(shipImg, direction)
}

/*
  получаем скорость корабля в зависимости от модели, это кастомные значения,
  здесь руководствовался принципом - чем больше корабль, тем он медленнее
  функция возвращает скорость в пикселях за 10 миллисек
*/

export function getShipSpeed(shipName) {
  switch (shipName) {
    case 'CR90 corvette': {
      return 1
    }
    case 'X-wing': {
      return 3
    }
    case 'Y-wing': {
      return 3
    }
    case 'Imperial shuttle': {
      return 2
    }
    case 'Millennium Falcon': {
      return 2
    }
    case 'Star Destroyer':{
      return 1
    }
    case 'Slave 1':{
      return 3
    }
    case 'Republic Cruiser':{
      return 1
    }
    case 'Naboo fighter':{
      return 3
    }
    case 'Naboo Royal Starship':{
      return 3
    }
  }
}

/*
  получаем размер корабля в зависимости от модели, это кастомные значения,
  здесь руководствовался своими представлениями об этих кораблях
  функция возвращает размер в пикселях
*/
export function getShipSize(shipName) {
  switch (shipName) {
    case 'CR90 corvette': {
      return 400
    }
    case 'X-wing': {
      return 100
    }
    case 'Y-wing': {
      return 100
    }
    case 'Imperial shuttle': {
      return 150
    }
    case 'Millennium Falcon': {
      return 150
    }
    case 'Star Destroyer':{
      return 600
    }
    case 'Slave 1':{
      return 100
    }
    case 'Republic Cruiser':{
      return 600
    }
    case 'Naboo fighter':{
      return 100
    }
    case 'Naboo Royal Starship':{
      return 100
    }
  }
}
