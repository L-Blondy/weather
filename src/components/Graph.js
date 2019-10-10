import React from 'react'

export default function Graph ( { hourlyData } ) {

	console.log( JSON.stringify( hourlyData ) )

	return hourlyData ?
		(
			<div>{ hourlyData[ 0 ][ 0 ].hour }</div>
		) : (
			<div>Loading...</div>
		)
}