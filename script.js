
const searchBtn = document.querySelector('button')


async function getWeatherInfo(city) {
	try {
		let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=QPYDGJZBXPXX4YTKKEGPVTW68&contentType=json`, {mode: 'cors'})
		let weatherData = await response.json();
		console.log(weatherData)
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


