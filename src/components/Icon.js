import React from 'react';
import { getIcon } from "../helpers/helpers";

export default function Icon ( props ) {
	const WeatherIcon = getIcon( props.payload )
	return (
		<WeatherIcon x={ props.cx - 15 } y={ props.cy - 15 } className="loading-img" height={ window.innerWidth > 480 ? "30px" : "20px" } width={ window.innerWidth > 480 ? "30px" : "20px" } />
	)
}
