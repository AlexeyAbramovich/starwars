import { getShipSize } from './getShipSize.js'
import { getShipSpeed } from './getShipSpeed.js'
import * as ship from './ship.js'
import { startTheShow } from './startTheShow.js'
import { availableShips } from './variables.js'

/*
Так как на api starwars не было особо полезной информации, то решил сделать банальную вещь,
получить названия кораблей и по этим названиям в дальнейшем устанавливать картинки в img тег
*/
export async function getStarWarsData() {
	// итоговые массив с отфильтрофанными кораблями и с моей версией объекта Ship
	const shipsArray = []
	/*
    массив состоящий из объектов, каждый из которых - отдельная страница с массивом объектов кораблей
    зачем они разбили данные на страницы - не знаю, моя задача была - объединить данные в один массив
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
    создаю новый объединенный массив из всех объектов кораблей со всех страниц
    и тут же фильтрую их по кораблям, для которых уже имеются картинки
  */
	const concatArray = [].concat(...dataArray).filter(ship => {
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
				getShipSize(shipData['name']),
				getShipSpeed(shipData['name'])
			)
		)
	}
	startTheShow(shipsArray)
}
