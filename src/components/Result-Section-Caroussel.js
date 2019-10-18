import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import { convertRemToPixels, getIcon } from "../helpers/helpers";
import { global } from "../styles/globalStyles";
import { ReactComponent as LoadingCircle } from "../assets/loading-circle.svg"
import { ReactComponent as Left } from "../assets/chevron-left.svg"
import { ReactComponent as Right } from "../assets/chevron-right.svg"

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

	setScrollCount = ( dir, scrollCount, items ) => {
		if ( scrollCount <= 0 && dir < 0 ) return;
		if ( scrollCount + items >= 16 && dir > 0 ) return;
		this.setState( {
			scrollCount: scrollCount + dir,
		} );
	}

	renderDailyData = ( dailyData, activeDay ) => {
		// if ( !dailyData ) {
		// 	history.push( '/' )
		// 	return;
		// }

		return dailyData ?
			(
				dailyData.map( ( day, index ) => {
					const Icon = getIcon( day )
					return (
						<button
							className={ "grid-item " + ( activeDay === index && "active" ) }
							key={ "day" + index }
							data-index={ index }
							onClick={ this.props.setCurrentActive }
						>
							<div className="date">{ day.date }</div>
							<Icon className="dailyIcon" />
							<div className="temperature">{ day.temperature + "°c" }</div>
							<div className="weather">{ day.weather }</div>
						</button>
					)
				} )
			) : (
				Array( 16 ).fill( "CI" ).map( ( val, ind ) => (
					<button className={ "grid-item " } key={ val + ind }>
						<LoadingCircle />
					</button>
				) )
			)
	}

	render () {
		const { itemWidth, scrollCount, items } = this.state;
		const { dailyData, activeDay, className } = this.props;

		return (
			<CarousselStyled
				className={ className }
				itemWidth={ itemWidth }
				scrollCount={ scrollCount }
				items={ items }
			>

				<button className="chevron-left" onClick={ () => this.setScrollCount( -1, scrollCount, items ) } >
					<Left />
				</button>

				<div className="grid-container">
					<ul className="grid" ref={ this.grid }>
						{ this.renderDailyData( dailyData, activeDay ) }
					</ul>
				</div>

				<button className="chevron-right" onClick={ () => this.setScrollCount( 1, scrollCount, items ) } >
					<Right />
				</button>

			</CarousselStyled>
		)
	}
}

const CarousselStyled = styled.div`
	display: grid;
	grid-template-columns: 40px auto 40px;
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
		transition: transform 350ms;

		.icon {
			width: 40px;
			height: auto;
		}

		.grid-item {
			position: relative;
			height: 95%;
			width: 95%;
			font-family: ${global.fontFamily.primary };
			color: ${global.fontColor.dark };
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
				color: ${global.fontColor.dark };
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
		color: ${global.fontColor.dark };
		text-align: left;
		font-size: 0;

		&:hover,
		&:focus {
			color: ${global.btnClr.secondary };
			outline: none;
		}
	}
	.chevron-left {
		color: ${props => props.scrollCount <= 0 && ( `${ global.fontColor.disabled }; pointer-events: none; user-select: none;` ) };
	}
	.chevron-right {
		color: ${props => props.scrollCount + props.items >= 16 && ( `${ global.fontColor.disabled }; pointer-events: none; user-select: none;` ) }
	}
`

export default withRouter( Caroussel )
