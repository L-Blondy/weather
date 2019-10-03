import React from 'react'
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

function Caroussel ( { history, dailyData } ) {

	const Caroussel = Caroussel_styles()

	const renderDailyData = () => {
		// if ( !dailyData ) {
		// 	history.push( '/' )
		// 	return;
		// }
		if ( !dailyData ) {
			dailyData = [ { "date": "Sep 30", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 01", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 24, "weather": "Broken clouds" }, { "date": "Oct 02", "imgSrc": "https://www.weatherbit.io/static/img/icons/t02d.png", "temperature": 23, "weather": "Storm with rain" }, { "date": "Oct 03", "imgSrc": "https://www.weatherbit.io/static/img/icons/r03d.png", "temperature": 20, "weather": "Heavy rain" }, { "date": "Oct 04", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 22, "weather": "Few clouds" }, { "date": "Oct 05", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 24, "weather": "Scattered clouds" }, { "date": "Oct 06", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 07", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 08", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 09", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 10", "imgSrc": "https://www.weatherbit.io/static/img/icons/c01d.png", "temperature": 27, "weather": "Clear Sky" }, { "date": "Oct 11", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 12", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 29, "weather": "Few clouds" }, { "date": "Oct 13", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 14", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 15", "imgSrc": "https://www.weatherbit.io/static/img/icons/c04d.png", "temperature": 24, "weather": "Overcast clouds" } ]
		}
		return dailyData.map( ( day, index ) => (
			<li className="day" key={ "day" + index } >
				<div className="date">{ day.date }</div>
				<img className="icon" src={ day.imgSrc } />
				<div className="temperature">{ day.temperature + "°c" }</div>
				<div className="weather">{ day.weather }</div>
			</li>
		) )
	}

	return (
		<Caroussel>
			{ renderDailyData() }
		</Caroussel>
	)
}

const Caroussel_styles = () => styled.div``

export default withRouter( Caroussel )
