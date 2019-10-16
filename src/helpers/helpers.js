import Axios from 'axios';
import { AversesDay, AversesNight, ClearDay, ClearNight, Cloud, CloudyDay, CloudyNight, FewCloudsDay, FewCloudsNight, Foggy, Mixed, Rain, Snow, SnowLittle, Storm } from "../assets/weather";
const { listTimeZones, findTimeZone, getZonedTime, getUnixTime } = require( 'timezone-support' )

export function convertRemToPixels ( rem ) {
	return rem * parseFloat( getComputedStyle( document.documentElement ).fontSize );
}

export function convertTS_toDate ( ts, offset ) {
	const dateObj = new Date( ( ts - 3600 * offset ) * 1000 );
	const utcString = dateObj.toUTCString();
	return utcString
}

export const getLocalTime = ( timezone ) => {
	const zone = findTimeZone( timezone )
	const localTime_raw = getZonedTime( new Date(), zone )
	return localTime_raw;
}

const getPrecip = ( precip_lvl ) => {
	switch ( precip_lvl ) {
		case 0:
			return 0;
		case 1:
			return 0.2;
		case 2:
			return 1;
		case 3:
			return 3;
		case 4:
			return 8;
		case 5:
			return 15;
		case 6:
			return 25;
		case 7:
			return 40;
		case 8:
			return 60;
		case 9:
			return 75;
		default:
			return 0;
	}
}

export const fetchDaily = async ( url ) => {
	return Axios.get( url )
		.then( resp => resp.data.data )
		.then( data => reduceDailyData( data ) )
		.catch( error => console.log( "DAILY : PLACE NOT FOUND", error ) );
}

export const reduceDailyData = ( data ) => {
	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	return data.reduce( ( res, cur ) => {
		const day = cur.datetime.slice( 8 )
		const month = cur.datetime.slice( 5, 7 )
		let weather = cur.weather.description === "Thunderstorm with heavy rain" || cur.weather.description === "Thunderstorm with rain" ? "Thunderstorm" : cur.weather.description

		const data = {
			sunrise: cur.sunrise_ts,
			sunset: cur.sunset_ts,
			moonrise: cur.moonrise_ts,
			moonset: cur.moonset_ts,
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

export const fetchHourly = async ( url ) => {
	const raw = await Axios.get( url );
	const rawData = await raw.data;
	return rawData;
}

export const reduceHourly = ( rawData, offset ) => {
	const data = rawData.dataseries;
	const startingHour = parseInt( rawData.init.slice( 8 ) );
	const day1_index = getDay1Index( startingHour - offset );

	const result = data.reduce( ( res, cur ) => {
		cur.hour = ( startingHour + cur.timepoint - offset ) % 24;
		cur.hour_english = cur.hour > 12 ? cur.hour - 12 + "pm" : cur.hour + "am";
		cur.origin = "7timer";
		cur.prec_amount = getPrecip( cur.prec_amount );
		return [ ...res, cur ];
	}, [] )

	return {
		0: [ ...result.slice( 0, 8 ) ],
		1: result.slice( day1_index, day1_index + 8 ),
		2: result.slice( day1_index + 8, day1_index + 16 ),
		3: result.slice( day1_index + 16, day1_index + 24 ),
		4: result.slice( day1_index + 24, day1_index + 32 ),
		5: result.slice( day1_index + 32, day1_index + 40 ),
		6: result.slice( day1_index + 40, day1_index + 48 ),
		7: result.slice( day1_index + 48, day1_index + 56 ),
	}
}

export const fetchCurrent = async ( url ) => {
	const raw = await Axios.get( url );
	const currentData = await raw.data.data[ 0 ]
	return currentData;
}

export const reduceCurrent = ( rawData, startingHour ) => {
	startingHour = 1;
	const currentWeather = {
		hour: startingHour,
		hour_english: startingHour > 12 ? startingHour - 12 + "pm" : startingHour + "am",
		prec_amount: rawData.precip,
		timepoint: 0,
		timezone: rawData.timezone,
		timestamp: rawData.ts,
		temp2m: Math.round( rawData.temp ),
		wind10m: {
			direction: rawData.wind_cdir,
			speed: Math.round( rawData.wind_spd ),
		},
		rh2m: rawData.rh,
		icon: rawData.weather.icon,
		weather: rawData.weather.description,
		origin: "weatherbit",
	}
	return currentWeather;
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
			case "tsday": return Storm;
			case "tsnight": return Storm;
			case "tsrainday": return Storm;
			case "tsrainnight": return Storm;
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