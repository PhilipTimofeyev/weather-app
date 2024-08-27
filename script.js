
const searchBtn = document.querySelector('button')
const fcToggle = document.getElementById('f-c-btn')


async function getWeatherInfo(city) {
	try {
		let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=QPYDGJZBXPXX4YTKKEGPVTW68&contentType=json`, {mode: 'cors'})
		let weatherData = await response.json();
		console.log(weatherData)
		weatherData = filterResponse(weatherData)
		updateDOM(weatherData)
	} catch(err) {
			alert(err)
	}
}


searchBtn.addEventListener('click', searchCity)
fcToggle.addEventListener('click', toggleDegrees)

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

	tempEl.innerText = `${temp} F°`
	conditionsEl.innerText = conditions
}

function toggleDegrees() {
	const tempEl = document.getElementById('temp').children[1]

	let degree = tempEl.innerText.match(/\d*/)[0]

	let cel = `${convertFtoC(degree)} C°`
	let far = `${convertCtoF(degree)} F°`
	
	tempEl.innerText = (tempEl.innerText.includes('F')) ? cel : far

}

function convertFtoC(far) {
	return ((far - 32) * (5/9)).toFixed(1)
}

function convertCtoF(cel) {
	return ((cel * (9/5)) + 32).toFixed(1)
}

