
async function getWeatherInfo(city) {
	const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=QPYDGJZBXPXX4YTKKEGPVTW68&contentType=json`, {mode: 'cors'})
	const weatherData = await response.json();
	return weatherData
}

console.log(getWeatherInfo('cincinnati'))

