
const searchBtn = document.querySelector('button')


async function getWeatherInfo(city) {
	try {
		let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=QPYDGJZBXPXX4YTKKEGPVTW68&contentType=json`, {mode: 'cors'})
		let weatherData = await response.json();
		console.log(weatherData)
		weatherData = filterResponse(weatherData)
		updateDOM(weatherData)
	} catch(err) {
		// Do something
	}
}


searchBtn.addEventListener('click', searchCity)

function searchCity() {
	event.preventDefault()
	const city = document.querySelector('input').value
	getWeatherInfo(city)
}

function filterResponse(response) {
	const allowedConditions = ['conditions', 'temp']
	const currentConditions = response.currentConditions

	const filtered = Object.fromEntries(
		Object.entries(currentConditions).filter(
			([key, value]) => allowedConditions.includes(key)
			)
		)
	return filtered
}


function updateDOM(weatherData) {
	const tempEl = document.getElementById('temp').children[1]
	const conditionsEl = document.getElementById('conditions').children[1]

	let temp = weatherData.temp
	let conditions = weatherData.conditions

	console.log(tempEl)

	tempEl.innerText = temp
	conditionsEl.innerText = conditions
}


