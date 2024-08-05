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
		// получаю значение left, убираю px в конце и преобразую в число
		let left = Number(shipImg.style.left.replace('px', ''))
		const interval = setInterval(() => {
			// в зависимости от направления прибавляю или уменьшаю скорость
			// как только корабль заходит за границы видимой области экрана на ширину img корабля, то удаляю его
			if (direction) {
				left -= this.speed
				if (left <= -this.size) {
					clearInterval(interval)
					shipImg.remove()
				}
			} else {
				left += this.speed
				if (left >= window.innerWidth + this.size) {
					clearInterval(interval)
					shipImg.remove()
				}
			}
			// меняю значение, и добавляю px в конце, так как это свойство - строка
			shipImg.style.left = left + 'px'
		}, 10)
	}

	setStartCoordinates(shipImg, direction) {
		/*
      генерируем рандомное значение для оси-y в диапазоне высоты окна браузера
      - this.size - чтобы корабли появлялись чаще вверху экрана,
      + this.size - чтобы корабли появлялись чаще внизу экрана
    */
		const top = Math.floor(Math.random() * 2)
			? Math.floor(Math.random() * window.innerHeight - this.size)
			: Math.floor(Math.random() * window.innerHeight + this.size)
		// проверяем не выходит ли картинка за пределы экрана снизу или сверху путем прибавления размера картинки
		if (top + this.size > window.innerHeight) {
			shipImg.style.bottom = 0
		} else {
			shipImg.style.top = top < 0 ? 0 : top + 'px'
		}
		// устанавливаем значение для оси-x в зависимости от направления,
		// в случае если корабль стартует справа, то смещаем img на её размер
		shipImg.style.left = direction
			? window.innerWidth + this.size + 'px'
			: -this.size + 'px'
		shipImg.style.left += 'px'
	}
}
