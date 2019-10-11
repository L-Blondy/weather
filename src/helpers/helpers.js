import Axios from 'axios';
import { AversesDay, AversesNight, ClearDay, ClearNight, Cloud, CloudyDay, CloudyNight, FewCloudsDay, FewCloudsNight, Foggy, Mixed, Rain, Snow, SnowLittle, Storm } from "../assets/weather";

const getCurrentHour = () => {
	const d = new Date();
	return d.getMinutes() <= 30 ? d.getHours() : d.getHours() + 1;
}

export const reduceDailyData = ( data ) => {
	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	return data.reduce( ( res, cur ) => {
		const day = cur.datetime.slice( 8 )
		const month = cur.datetime.slice( 5, 7 )
		let weather = cur.weather.description === "Thunderstorm with rain" ? "Storm with rain" : cur.weather.description;

		const data = {
			date: months[ month - 1 ] + " " + day,
			temperature: Math.round( cur.max_temp ),
			icon: cur.weather.icon,
			weather: weather,
			origin: "weatherbit",
		}
		res = [ ...res, data ]
		return res;
	}, [] )
}

export const reduceHourlyData = ( data ) => {
	const currentHour = getCurrentHour();
	const result = data.reduce( ( res, cur ) => {
		cur.hour = ( currentHour + cur.timepoint ) % 24;
		cur.hour = cur.hour > 12 ? cur.hour - 12 + "pm" : cur.hour + "am";
		cur.origin = "7timer";
		return [ ...res, cur ];
	}, [] )
	return result;
}

export function convertRemToPixels ( rem ) {
	return rem * parseFloat( getComputedStyle( document.documentElement ).fontSize );
}

export const fetchDaily = async ( url ) => {
	return Axios.get( url )
		.then( resp => resp.data.data )
		.then( data => reduceDailyData( data ) )
		.catch( error => console.log( "DAILY : PLACE NOT FOUND", error ) );
}

export const fetchCurrent = async ( url ) => {
	const raw = await Axios.get( url );
	const currentData = await raw.data.data[ 0 ]

	const currentHour = getCurrentHour();

	const currentWeather = await {
		hour: currentHour > 12 ? currentHour - 12 + "pm" : currentHour + "am",
		timepoint: 0,
		temp2m: Math.round( currentData.temp ),
		wind10m: {
			direction: currentData.wind_cdir,
			speed: Math.round( currentData.wind_spd ),
		},
		rh2m: currentData.rh,
		icon: currentData.weather.icon,
		weather: currentData.weather.description,
		origin: "weatherbit",
	}
	return currentWeather;
}
export const fetchHourly = async ( url ) => {
	const raw = await Axios.get( url );
	const rawData = await raw.data.dataseries;
	return reduceHourlyData( rawData );
}

export const getDay1Index = ( currentHour ) => {
	return Math.floor( ( 24 - currentHour ) / 3 );
}

export const getIcon = ( data ) => {
	if ( data.origin === "7timer" ) {
		switch ( data.weather ) {
			case "clearday": return ClearDay;
			case "clearnight": return ClearNight;
			case "pcloudyday": return FewCloudsDay;
			case "pcloudynight": return FewCloudsNight;
			case "mcloudyday": return CloudyDay;
			case "mcloudynight": return CloudyNight;
			case "cloudyday": return Cloud;
			case "cloudynight": return Cloud;
			case "humidday": return CloudyDay;
			case "humidnight": return CloudyNight;
			case "lightrainday": return AversesDay;
			case "lightrainnight": return AversesNight;
			case "oshowerday": return AversesDay;
			case "oshowernight": return AversesNight;
			case "ishowerday": return AversesDay;
			case "ishowernight": return AversesNight;
			case "lightsnowday": return SnowLittle;
			case "lightsnownight": return SnowLittle;
			case "rainday": return Rain;
			case "rainnight": return Rain;
			case "snowday": return Snow;
			case "snownight": return Snow;
			case "rainsnowday": return Mixed;
			case "rainsnownight": return Mixed;
			default: return "dsg";
		}
	}

	else if ( data.origin === "weatherbit" ) {
		const code = data.icon;

		switch ( code.slice( 0, 3 ) ) {
			case "c01": {
				return code === "c01d" ? ClearDay : ClearNight;
			}
			case "c02": {
				return code === "c02d" ? FewCloudsDay : FewCloudsNight;
			}
			case "c03": {
				return code === "c03d" ? CloudyDay : CloudyNight;
			}
			case "c04":
				return Cloud;
			case "t01":
				return Storm;
			case "t02":
				return Storm;
			case "t03":
				return Storm;
			case "t04":
				return Storm;
			case "t05":
				return Storm;
			case "d01": {
				return code === "d01d" ? AversesDay : AversesNight;
			}
			case "d02": {
				return code === "d02d" ? AversesDay : AversesNight;
			}
			case "d03": {
				return code === "d03d" ? AversesDay : AversesNight;
			}
			case "r01": {
				return code === "r01d" ? AversesDay : AversesNight;
			}
			case "r02": {
				return code === "r02d" ? AversesDay : AversesNight;
			}
			case "r03": {
				return code === "r03d" ? AversesDay : AversesNight;
			}
			case "r04": {
				return code === "r04d" ? AversesDay : AversesNight;
			}
			case "r05": {
				return code === "r05d" ? AversesDay : AversesNight
			}
			case "f01":
				return Rain;
			case "r06":
				return Rain;
			case "u00":
				return Rain;
			case "s01":
				return SnowLittle;
			case "s02":
				return Snow;
			case "s03":
				return Snow;
			case "s04":
				return Mixed;
			case "s05":
				return Snow;
			case "s06":
				return SnowLittle;
			case "a01":
				return Foggy;
			case "a02":
				return Foggy;
			case "a03":
				return Foggy;
			case "a04":
				return Foggy;
			case "a05":
				return Foggy;
			case "a06":
				return Foggy;
			default:
				return Cloud;
		}
	}
}