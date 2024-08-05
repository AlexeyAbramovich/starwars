import { space } from './variables.js'

export function createRandomShip(shipsArray) {
	// рандомно генерим значение слева или справа корабль начнет полёт
	// 0 - справа, 1 - слева
	const direction = Math.floor(Math.random() * 2)
	// создаем рандомный корабль на базе доступных кораблей(создается именно новый объект, чтоб у каждого корабля был свой уникальный объект)
	const randomShip = Object.create(shipsArray[Math.floor(Math.random() * 10)])
	// создаем img
	const shipImg = document.createElement('img')
	shipImg.src = randomShip.imgUrl
	shipImg.style.display = 'block'
	shipImg.style.position = 'absolute'
	// в зависимости от направления делаем разворот картинки
	shipImg.style.transform = direction ? 'unset' : 'rotate(180deg)'
	shipImg.style.width = randomShip.size + 'px'
	shipImg.alt = randomShip.name
	space.appendChild(shipImg)
	// устанавливаем координаты корабля и запускаем в долгий путь
	randomShip.setStartCoordinates(shipImg, direction)
	randomShip.fly(shipImg, direction)
}
