import { getStarWarsData } from './getStarwarsData.js'
import { bgMusic, logo, overlay } from './variables.js'

export function showLogo() {
	document.body.onclick = function () {
		// запускаем музыку(браузер предотвращает autoplay, поэтому по клику запускаю), и интро
		bgMusic.play()
		new Promise(r => {
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
				return new Promise(r => {
					setTimeout(() => {
						r()
					}, 3000)
				})
			})
			.then(() => {
				// постепенно уменьшаем прозрачность до 0, при 0 скрываем лого и затемнение
				return new Promise(r => {
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
}
