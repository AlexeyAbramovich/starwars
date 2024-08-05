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
		case 'Star Destroyer': {
			return 600
		}
		case 'Slave 1': {
			return 100
		}
		case 'Republic Cruiser': {
			return 600
		}
		case 'Naboo fighter': {
			return 100
		}
		case 'Naboo Royal Starship': {
			return 100
		}
	}
}
