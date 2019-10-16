import React from 'react'

export default function Humidity ( { dailyData, activeDay } ) {

	const data = dailyData[ activeDay ];
	console.log( data )
	return (
		<div>
			<div className="max-temp" >{ data.max_temp }</div>
			<div className="min-temp" >{ data.min_temp }</div>
			<div className="precipitation" >{ data.precip }</div>
			<div className="humidity" >{ data.rh }</div>
		</div>
	)
}
