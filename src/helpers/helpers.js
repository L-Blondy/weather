import Axios from 'axios';
import { AversesDay, AversesNight, ClearDay, ClearNight, Cloud, CloudyDay, CloudyNight, FewCloudsDay, FewCloudsNight, Foggy, Mixed, Rain, Snow, SnowLittle, Storm } from "../assets/weather";
const { findTimeZone, getZonedTime } = require( 'timezone-support' )

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

export const getPrecip = ( precip_lvl ) => {
	switch ( precip_lvl ) {
		case 0: return 0;
		case 1: return 0;
		case 2: return 1;
		case 3: return 3;
		case 4: return 8;
		case 5: return 15;
		case 6: return 25;
		case 7: return 40;
		case 8: return 60;
		case 9: return 75;
		default: return 0;
	}
}

const getPrecipLvl = ( precip ) => {
	if ( precip === 0 ) return 0;
	else if ( precip < 2 ) return 1;
	else if ( precip < 5 ) return 2;
	else if ( precip < 10 ) return 3;
	else if ( precip < 20 ) return 4;
	else if ( precip < 40 ) return 5;
	else if ( precip < 60 ) return 6;
	else return 7;
}

export const fetchDaily = async ( url ) => {
	return Axios.get( url )
		.then( resp => {
			return {
				data: resp.data.data,
				timezone: resp.data.timezone,
			}
		} )
		.catch( error => console.log( "DAILY : PLACE NOT FOUND", error ) );
}

export const reduceDaily = ( data ) => {
	const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	return data.reduce( ( res, cur ) => {
		const day = cur.datetime.slice( 8 )
		const month = cur.datetime.slice( 5, 7 )
		let weather = cur.weather.description === "Thunderstorm with heavy rain" || cur.weather.description === "Thunderstorm with rain" ? "Thunderstorm" : cur.weather.description

		const data = {
			origin: "weatherbit",
			sunrise: cur.sunrise_ts,
			sunset: cur.sunset_ts,
			moonrise: cur.moonrise_ts,
			moonset: cur.moonset_ts,
			date: months[ month - 1 ] + " " + day,
			temperature: Math.round( cur.max_temp ),
			icon: cur.weather.icon,
			weather: weather,
			rh: cur.rh,
			precip: Math.round( cur.precip ),
			precip_lvl: getPrecipLvl( Math.round( cur.precip ) ),
			max_temp: Math.round( cur.max_temp ),
			min_temp: Math.round( cur.min_temp ),
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
	let currentDay_index = 0;
	let dailyMax = -200;
	let dailyMin = 200;

	const result = data.reduce( ( res, cur, ind ) => {
		if ( ( ind - day1_index ) % 8 === 0 ) {
			currentDay_index++;
			dailyMax = -200;
			dailyMin = 200;
		}
		if ( currentDay_index > 7 )
			return res;
		if ( cur.temp2m > dailyMax ) {
			dailyMax = cur.temp2m
		}
		if ( cur.temp2m < dailyMin ) {
			dailyMin = cur.temp2m
		}

		cur.dailyMax = dailyMax;
		cur.dailyMin = dailyMin;
		cur.hour = ( startingHour + cur.timepoint - offset ) % 24;
		cur.hour = ( cur.hour < 0 ) ? cur.hour + 24 : cur.hour;
		cur.hour_english = cur.hour > 12 ? cur.hour - 12 + "pm" : cur.hour + "am";
		cur.origin = "7timer";
		cur.prec_amount = getPrecip( cur.prec_amount );

		if ( currentDay_index === 1 && res[ 0 ].length < 8 )
			res[ 0 ] = [ ...res[ 0 ], cur ]
		res[ currentDay_index ] = [ ...res[ currentDay_index ], cur ]

		return res;
	}, Array( 8 ).fill( [] ) )

	return result;
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
			case "c04": return Cloud;
			case "t01": return Storm;
			case "t02": return Storm;
			case "t03": return Storm;
			case "t04": return Storm;
			case "t05": return Storm;
			case "f01": return Rain;
			case "r06": return Rain;
			case "u00": return Rain;
			case "s01": return SnowLittle;
			case "s02": return Snow;
			case "s03": return Snow;
			case "s04": return Mixed;
			case "s05": return Snow;
			case "s06": return SnowLittle;
			case "a01": return Foggy;
			case "a02": return Foggy;
			case "a03": return Foggy;
			case "a04": return Foggy;
			case "a05": return Foggy;
			case "a06": return Foggy;
			default: return Cloud;
		}
	}
}