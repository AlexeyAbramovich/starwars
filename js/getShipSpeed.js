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
		case 'Star Destroyer': {
			return 1
		}
		case 'Slave 1': {
			return 3
		}
		case 'Republic Cruiser': {
			return 1
		}
		case 'Naboo fighter': {
			return 3
		}
		case 'Naboo Royal Starship': {
			return 3
		}
	}
}
