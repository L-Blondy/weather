import React from 'react';
import { getIcon } from "../helpers/helpers";

export default function Icon ( props ) {
	console.log( props )

	const WeatherIcon = getIcon( props.payload )
	return (
		<WeatherIcon x={ props.cx - 15 } y={ props.cy - 15 } className="loading-img" height="30px" width="30px" />
	)
}
