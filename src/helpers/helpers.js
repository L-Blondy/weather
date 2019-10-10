import Axios from 'axios';

const getCurrentHour = () => {
	const d = new Date();
	return d.getMinutes() <= 30 ? d.getHours() : d.getHours() + 1;
}

export const reduceDailyData = ( data ) => {
	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	return data.reduce( ( res, cur ) => {
		const day = cur.datetime.slice( 8 )
		const month = cur.datetime.slice( 5, 7 )
		let weather = cur.weather.description === "Thunderstorm with rain" ? "Storm with rain" : cur.weather.description;
		const iconName = normalize_icons_weatherBit( cur.weather.icon );

		const data = {
			date: months[ month - 1 ] + " " + day,
			imgSrc: `./assets/weather/${ iconName }`,
			temperature: Math.round( cur.max_temp ),
			weather: weather,
		}
		res = [ ...res, data ]
		return res;
	}, [] )
}

export const reduceHourlyData = ( data ) => {
	const currentHour = getCurrentHour();
	return data.reduce( ( res, cur ) => {
		cur.hour = ( currentHour + cur.timepoint ) % 24;
		const iconName = normalize_icons_weatherBit( cur.weather );
		cur.imgSrc = `./assets/weather/${ iconName }`
		return [ ...res, cur ];
	}, [] )
}

export function convertRemToPixels ( rem ) {
	return rem * parseFloat( getComputedStyle( document.documentElement ).fontSize );
}

export const normalize_icons_weatherBit = ( code ) => {
	switch ( code.slice( 0, 3 ) ) {
		case "c01": {
			return code === "c01d" ? "clear_day.svg" : "clear_night.svg"
		}
		case "c02": {
			return code === "c02d" ? "few_clouds_day.svg" : "few_clouds_night.svg"
		}
		case "c03": {
			return code === "c03d" ? "cloudy_day.svg" : "cloudy_night.svg"
		}
		case "c04":
			return "cloud.svg"
		case "t01":
			return "storm.svg"
		case "t02":
			return "storm.svg"
		case "t03":
			return "storm.svg"
		case "t04":
			return "storm.svg"
		case "t05":
			return "storm.svg"
		case "d01": {
			return code === "d01d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "d02": {
			return code === "d02d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "d03": {
			return code === "d03d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "r01": {
			return code === "r01d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "r02": {
			return code === "r02d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "r03": {
			return code === "r03d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "r04": {
			return code === "r04d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "r05": {
			return code === "r05d" ? "Averses_day.svg" : "Averses_night.svg"
		}
		case "f01":
			return "rain.svg"
		case "r06":
			return "rain.svg"
		case "u00":
			return "rain.svg"
		case "s01":
			return "snow_little.svg"
		case "s02":
			return "snow.svg"
		case "s03":
			return "snow.svg"
		case "s04":
			return "Mixed.svg"
		case "s05":
			return "snow.svg"
		case "s06":
			return "snow_little.svg"
		case "a01":
			return "foggy.svg"
		case "a02":
			return "foggy.svg"
		case "a03":
			return "foggy.svg"
		case "a04":
			return "foggy.svg"
		case "a05":
			return "foggy.svg"
		case "a06":
			return "foggy.svg"
		default:
			return "cloud.svg"
	}
}

export const fetchDaily = async ( url ) => {
	return Axios.get( url )
		.then( resp => resp.data.data )
		.then( data => reduceDailyData( data ) )
		.catch( error => console.log( "DAILY : PLACE NOT FOUND", error ) )
}

export const fetchCurrent = async ( url ) => {
	const currentHour = getCurrentHour();
	const raw = await Axios.get( url )
	const currentData = await raw.data.data[ 0 ];
	const iconName = normalize_icons_weatherBit( currentData.weather.icon )

	const currentWeather = await {
		timepoint: 0,
		hour: currentHour,
		temp2m: currentData.temp,
		wind10m: {
			direction: currentData.wind_cdir,
			speed: Math.round( currentData.wind_spd ),
		},
		rh2m: currentData.rh,
		imgSrc: `./assets/weather/${ iconName }`,
		weather: currentData.weather.description
	}
	return currentWeather;
}
export const fetchHourly = async ( url ) => {
	const raw = await Axios.get( url )
	const rawData = await raw.data.dataseries
	return reduceHourlyData( rawData )
}

export const getDay1Index = () => {
	const currentHour = getCurrentHour()
	return Math.floor( ( 24 - currentHour ) / 3 )
}