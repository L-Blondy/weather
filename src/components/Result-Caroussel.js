import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { convertRemToPixels } from "../helpers/helpers";
import { global } from "../styles/globalStyles";
// import { carousselAnim } from "../styles/keyframes";

class Caroussel extends React.Component {
	constructor ( props ) {
		super( props );
		this.grid = React.createRef()

		this.state = {
			itemWidth: null,
			items: null,
			activeDay: 0,
			scrollCount: 0,
		}
	}

	componentDidMount = () => {
		window.addEventListener( "resize", this.resize );
		this.resize();
	}

	componentWillUnmount = () => {
		window.removeEventListener( "resize", this.resize )
	}

	resize = () => {
		const gridWidth = this.grid.current.getBoundingClientRect().width;
		const items = Math.floor( gridWidth / convertRemToPixels( 7.65 ) );
		this.setState( {
			itemWidth: gridWidth / items,
			items
		} );
	}

	scrollCount = ( dir ) => {
		const { scrollCount, items } = this.state;
		if ( scrollCount <= 0 && dir < 0 ) return;
		if ( scrollCount + items >= 16 && dir > 0 ) return;
		this.setState( {
			scrollCount: scrollCount + dir,
		} );
	}

	setCurrentActive = ( index ) => {
		this.setState( {
			activeDay: index,
		} )
	}

	renderDailyData = () => {
		let { dailyData } = this.props;
		const { activeDay } = this.state;
		// if ( !dailyData ) {
		// 	history.push( '/' )
		// 	return;
		// }
		if ( !dailyData ) {
			dailyData = [ { "date": "Sep 30", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 01", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 24, "weather": "Broken clouds" }, { "date": "Oct 02", "imgSrc": "https://www.weatherbit.io/static/img/icons/t02d.png", "temperature": 23, "weather": "Storm with rain" }, { "date": "Oct 03", "imgSrc": "https://www.weatherbit.io/static/img/icons/r03d.png", "temperature": 20, "weather": "Heavy rain" }, { "date": "Oct 04", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 22, "weather": "Few clouds" }, { "date": "Oct 05", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 24, "weather": "Scattered clouds" }, { "date": "Oct 06", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 07", "imgSrc": "https://www.weatherbit.io/static/img/icons/c03d.png", "temperature": 25, "weather": "Broken clouds" }, { "date": "Oct 08", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 09", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 10", "imgSrc": "https://www.weatherbit.io/static/img/icons/c01d.png", "temperature": 27, "weather": "Clear Sky" }, { "date": "Oct 11", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 12", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 29, "weather": "Few clouds" }, { "date": "Oct 13", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 27, "weather": "Few clouds" }, { "date": "Oct 14", "imgSrc": "https://www.weatherbit.io/static/img/icons/c02d.png", "temperature": 25, "weather": "Few clouds" }, { "date": "Oct 15", "imgSrc": "https://www.weatherbit.io/static/img/icons/c04d.png", "temperature": 24, "weather": "Overcast clouds" } ]
		}
		return dailyData.map( ( day, index ) => (
			<button className={ "grid-item " + ( activeDay === index && "active" ) } key={ "day" + index } onClick={ () => this.setCurrentActive( index ) }>
				<div className="date">{ day.date }</div>
				<img className="icon" src={ day.imgSrc } alt="" />
				<div className="temperature">{ day.temperature + "°c" }</div>
				<div className="weather">{ day.weather }</div>
			</button>
		) )
	}

	render () {
		const { itemWidth, scrollCount } = this.state;

		return (
			<Caroussel_styled className="caroussel" itemWidth={ itemWidth } scrollCount={ scrollCount }>
				<button className="left" onClick={ () => this.scrollCount( -1 ) } >LEFT</button>

				<div className="grid-container">
					<ul className="grid" ref={ this.grid }>
						{ this.renderDailyData() }
					</ul>
				</div>

				<button className="right" onClick={ () => this.scrollCount( 1 ) } >RIGHT</button>
			</Caroussel_styled>
		)
	}
}

const Caroussel_styled = styled.div`
	display: grid;
	grid-template-columns: 50px auto 50px;
	width: 100%;

	.grid-container {
		overflow: hidden;
	}
	.grid {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: ${props => props.itemWidth }px;
		grid-auto-rows: 8rem;
		place-items: center;
		list-style: none;
		transform: translateX(${props => - props.scrollCount * props.itemWidth }px);
		transition: transform 200ms;

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
			user-select: none;

			&.active {
				background: #ffffffaa;
				box-shadow: 0 0 10px 0 #00000020;
				outline: none;
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

export default withRouter( Caroussel )
