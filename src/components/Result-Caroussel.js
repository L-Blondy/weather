import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { convertRemToPixels, getIcon } from "../helpers/helpers";
import { global } from "../styles/globalStyles";
import { ReactComponent as Loading } from "../assets/loading.svg"

class Caroussel extends React.Component {
	constructor ( props ) {
		super( props );
		this.grid = React.createRef()

		this.state = {
			itemWidth: null,
			items: null,
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

	renderDailyData = () => {
		let { dailyData, activeDay } = this.props;
		// if ( !dailyData ) {
		// 	history.push( '/' )
		// 	return;
		// }
		dailyData = [ { "date": "Oct 11", "temperature": 16, "icon": "r04d", "weather": "Light shower rain", "origin": "weatherbit" }, { "date": "Oct 12", "temperature": 16, "icon": "r04d", "weather": "Light shower rain", "origin": "weatherbit" }, { "date": "Oct 13", "temperature": 20, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }, { "date": "Oct 14", "temperature": 20, "icon": "t02d", "weather": "Thunderstorm", "origin": "weatherbit" }, { "date": "Oct 15", "temperature": 16, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }, { "date": "Oct 16", "temperature": 16, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }, { "date": "Oct 17", "temperature": 15, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 18", "temperature": 14, "icon": "c02d", "weather": "Few clouds", "origin": "weatherbit" }, { "date": "Oct 19", "temperature": 15, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }, { "date": "Oct 20", "temperature": 14, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }, { "date": "Oct 21", "temperature": 14, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 22", "temperature": 14, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 23", "temperature": 14, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 24", "temperature": 12, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 25", "temperature": 8, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "date": "Oct 26", "temperature": 6, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" } ]
		return dailyData ?
			(
				dailyData.map( ( day, index ) => {
					const Icon = getIcon( day )
					return (
						<button className={ "grid-item " + ( activeDay === index && "active" ) } key={ "day" + index } onClick={ () => this.props.setCurrentActive( index ) }>
							<div className="date">{ day.date }</div>
							<Icon className="dailyIcon" />
							<div className="temperature">{ day.temperature + "°c" }</div>
							<div className="weather">{ day.weather }</div>
						</button>
					)
				} )
			) : (
				Array( 16 ).fill( "qesad" ).map( ( val, ind ) => (
					<button className={ "grid-item " } key={ val + ind }>
						<Loading />
					</button>
				) )
			)
	}

	render () {
		const { itemWidth, scrollCount, items } = this.state;

		return (
			<CarousselStyled
				className="caroussel"
				itemWidth={ itemWidth }
				scrollCount={ scrollCount }
				items={ items }
			>

				<button className="chevron-left" onClick={ () => this.scrollCount( -1 ) } >
					<svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 42L2 22L22 2" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
					</svg>
				</button>

				<div className="grid-container">
					<ul className="grid" ref={ this.grid }>
						{ this.renderDailyData() }
					</ul>
				</div>

				<button className="chevron-right" onClick={ () => this.scrollCount( 1 ) }>
					<svg width="24" height="44" viewBox="0 0 24 44" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2 2L22 22L2 42" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
					</svg>
				</button>

			</CarousselStyled>
		)
	}
}

const CarousselStyled = styled.div`
	display: grid;
	grid-template-columns: 50px auto 50px;
	width: 100%;
	align-items: center;

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
			position: relative;
			height: 95%;
			width: 95%;
			font-family: ${global.fontFamily.primary };
			color: ${global.fontColor.primary };
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

			.loading-img {
				height: 25%;
				color: ${global.fontColor.primary };
			}

			&.active {
				background: #ffffffaa;
				box-shadow: 0 0 10px 0 #00000020;
				outline: none;
			}
			&:active {
				outline: none;
			}
			.temperature {
				font-family: ${global.fontFamily.primary };
				font-size: 1.2rem;
				padding: 2px 0;
				letter-spacing: 1px;
			}
			.dailyIcon {
				height: auto;
				width: 2.5rem;
			}
			* {
				pointer-events: none;
			}
		}
	}
	.chevron-left,
	.chevron-right {
		background: none;
		border: none;
		color: ${global.fontColor.primary };

		&:hover,
		&:focus {
			color: ${global.btnClr.secondary };
			outline: none;
		}
	}
	.chevron-left {
		color: ${props => props.scrollCount <= 0 && ( `${ global.fontColor.disabled }; pointer-events: none; user-select: none;` ) }
	}
	.chevron-right {
		text-align: left;
		color: ${props => props.scrollCount + props.items >= 16 && ( `${ global.fontColor.disabled }; pointer-events: none; user-select: none;` ) }
	}
`

export default withRouter( Caroussel )
