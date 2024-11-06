
const searchBtn = document.querySelector('button')
const fcToggle = document.getElementById('f-c-btn')
const loader = document.querySelector('.loader')
const weatherDisplay = document.querySelector('#weather-display')

let temp

async function getWeatherInfo(city) {
	try {
		loader.style.visibility = 'visible'
		let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=QPYDGJZBXPXX4YTKKEGPVTW68&contentType=json`, {mode: 'cors'})
		let weatherData = await response.json();
		weatherData = filterResponse(weatherData)
		weatherDisplay.style.visibility = 'visible'
		loader.style.visibility = 'hidden'
		updateDOM(weatherData)
	} catch(err) {
		alert(err)
	}
}

searchBtn.addEventListener('click', searchCity)
fcToggle.addEventListener('click', toggleDegrees)

function searchCity(e) {
	e.preventDefault()
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

	temp = weatherData.temp
	let conditions = weatherData.conditions

	tempEl.innerText = `${temp} F°`
	conditionsEl.innerText = conditions
}

function toggleDegrees() {
	const tempEl = document.getElementById('temp').children[1]

	if (!tempEl.innerText) return

	let cel = `${convertFtoC()} C°`
	let far = `${temp} F°`

	tempEl.innerText = (tempEl.innerText.includes('F')) ? cel : far
}

function convertFtoC() {
	return ((temp - 32) * (5/9)).toFixed(1)
}
