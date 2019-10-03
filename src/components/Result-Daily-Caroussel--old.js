import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { convertRemToPixels } from "../helpers/helpers";
import { global } from "../styles/globalStyles";

function Caroussel ( { history, dailyData } ) {

	const [ itemWidth, setItemWidth ] = React.useState();
	const [ activeDay, setActiveDay ] = React.useState( 0 );
	const curScroll = React.useRef( 0 )
	const grid = React.useRef()
	const Caroussel = Caroussel_styles( itemWidth )

	React.useEffect( () => {
		console.log( "MOUNT" )
		window.addEventListener( "resize", resize );
		resize();
		return () => {
			window.removeEventListener( "resize", resize )
		};
	}, [] )
	React.useEffect( () => {
		grid.current.scrollLeft = curScroll.current;
	} )

	const resize = () => {
		const gridWidth = grid.current.getBoundingClientRect().width
		const items = Math.floor( gridWidth / convertRemToPixels( 7.65 ) )
		setItemWidth( gridWidth / items )
	}

	const scroll = ( dir ) => {
		grid.current.scrollLeft = curScroll.current + dir * Math.round( itemWidth );
		curScroll.current = grid.current.scrollLeft;
	}

	const renderDailyData = () => {
		// if ( !dailyData ) {
		// 	history.push( '/' )
		// 	return;
		// }
		if ( !dailyData ) {
			dailyData = [ { "date": "Sep 30", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 01", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 24, "weather": "Broken clouds" }, { "date": "Oct 02", "imgSrc": "https://www.weatherbit.io/static/img/icons/t02d.png", "temperature": 23, "weather": "Storm with rain" }, { "date": "Oct 03", "imgSrc": "https://www.weatherbit.io/static/img/icons/r03d.png", "temperature": 20, "weather": "Heavy rain" }, { "date": "Oct 04", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 22, "weather": "Few clouds" }, { "date": "Oct 05", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 24, "weather": "Scattered clouds" }, { "date": "Oct 06", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 07", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 08", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 09", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 10", "imgSrc": "https://www.weatherbit.io/static/img/icons/c01d.png", "temperature": 27, "weather": "Clear Sky" }, { "date": "Oct 11", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 12", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 29, "weather": "Few clouds" }, { "date": "Oct 13", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 14", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 15", "imgSrc": "https://www.weatherbit.io/static/img/icons/c04d.png", "temperature": 24, "weather": "Overcast clouds" } ]
		}
		return dailyData.map( ( day, index ) => (
			<button className={ "grid-item " + ( activeDay === index ? "active" : "" ) } key={ "day" + index } onClick={ () => setActiveDay( index ) }>
				<div className="date">{ day.date }</div>
				<img className="icon" src={ day.imgSrc } alt="" />
				<div className="temperature">{ day.temperature + "°c" }</div>
				<div className="weather">{ day.weather }</div>
			</button>
		) )
	}

	return (
		<Caroussel className="caroussel">
			<button className="left" onClick={ () => scroll( -1 ) } >LEFT</button>

			<ul className="grid" ref={ grid }>
				{ renderDailyData() }
			</ul>

			<button className="right" onClick={ () => scroll( 1 ) } >RIGHT</button>
		</Caroussel>
	)
}

const Caroussel_styles = ( itemWidth ) => styled.div`
	display: grid;
	grid-template-columns: 50px auto 50px;
	width: 100%;

	.grid {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: ${itemWidth }px;
		grid-auto-rows: 8rem;
		place-items: center;
		list-style: none;
		overflow: hidden;

		.icon {
			width: 40px;
			height: auto;
		}

		.grid-item {
			height: 95%;
			width: 95%;
			font-family: ${global.fontFamily.primary };
			font-size: 0.9rem;
			padding-left: 0.5rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			background: transparent;
			border: none;
			white-space: nowrap;

			&.active {
				background: #ffffffaa;
				box-shadow: 0 0 10px 0 #00000020;
			}
			&:active {
				outline: none;
			}
			.temperature {
				font-family: ${global.fontFamily.secondary };
				font-size: 1.3rem;
				padding-bottom: 2px;
			}
			* {
				pointer-events: none;
			}
		}
		
	}
`

export default React.memo( withRouter( Caroussel ) )
