import { createRandomShip } from './createRandomShip.js'

// запускаем все это добро
export function startTheShow(shipsArray) {
	setInterval(() => {
		// запускаем создание корабля с интервалом 500 миллисек - 2.5 сек
		createRandomShip(shipsArray)
	}, Math.floor(Math.random() * 2000 + 500))
}
