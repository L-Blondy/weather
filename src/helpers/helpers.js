export const reduceDailyData = ( data ) => {
	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	return data.reduce( ( res, cur, index ) => {
		const day = cur.datetime.slice( 8 )
		const month = cur.datetime.slice( 5, 7 )
		let weather = cur.weather.description === "Thunderstorm with rain" ? "Storm with rain" : cur.weather.description;

		const data = {
			date: months[ month - 1 ] + " " + day,
			imgSrc: `https://www.weatherbit.io/static/img/icons/${ cur.weather.icon }.png`,
			temperature: Math.round( cur.max_temp ),
			weather: weather,
		}
		res = [ ...res, data ]
		return res;
	}, [] )
}

//https://www.weatherbit.io/static/img/icons/r01d.png