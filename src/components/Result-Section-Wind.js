import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WindDir } from "../assets/wind.svg"
import ThemeContext from "../ThemeContext";
import { ReactComponent as LoadingCircle } from "../assets/loading-circle.svg"

export default function Wind ( { hourlyData, activeDay, className } ) {
	const theme = React.useContext( ThemeContext )
	const data = hourlyData && hourlyData[ activeDay ];

	const getAngle = ( hour ) => {
		switch ( hour.wind10m.direction ) {
			case "N":
				return 0;
			case "NE":
				return 45;
			case "E":
				return 90;
			case "SE":
				return 135;
			case "S":
				return 180;
			case "SW":
				return 225;
			case "W":
				return 270;
			case "NW":
				return 315
			default:
				return 0;
		}
	}

	const renderDirection = ( data ) => (
		data.map( ( hourly, index ) => (
			<WindItem className="wind-direction" key={ "rot" + index } rotate={ getAngle( hourly ) + "deg" } >
				<WindDir className="wind" />
			</WindItem>
		) )
	)
	const renderSpeed = ( data ) => (
		data.map( ( hourly, index ) => (
			<WindItem className="wind-speed" key={ "dir" + index }>
				{ hourly.wind10m.speed }
			</WindItem>
		) )
	)
	const renderHour = ( data ) => (
		data.map( ( hourly, index ) => {
			const hour = hourly.hour;
			return (
				<WindItem className="wind-hour" key={ "hour" + index }>
					{ hour.toString().length === 1 ? "0" + hour : hour }
				</WindItem>
			)
		} )
	)

	return !hourlyData ?
		(
			<div className={ "loading-container " + className }>
				<LoadingCircle />
			</div>
		) : activeDay > 7 ? (
			<NoData className={ "loading-container " + className }>
				<span>Wind data is available for the next 7 days only</span>
			</NoData>
		) : (
				<WindStyled className={ className } theme={ theme }>
					<span>Wind (m/s)</span>
					<div className="wind-grid">
						{ renderSpeed( data ) }
						{ renderDirection( data ) }
						{ renderHour( data ) }
					</div>
				</WindStyled>
			)
}

const WindStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	font-family: ${props => props.theme.fontFam.primary };

	span {
		margin: 1rem 0 0.5rem 0;
	}

	& > .wind-grid {
		display: grid;
		font-size: 0.9rem;
		grid-template-columns: repeat(8, 1.5rem);
		grid-template-rows: repeat(3, 1.5rem);
	}

	.wind-direction {
		color: #5d6467;
	}

	.wind-speed {
		font-weight: 900;
	}
`

const NoData = styled.div`
	
	& > span {
		position: absolute;
		top: 1.5rem;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 0.7rem;
		width: 100%;
		text-align: center;
	}
`

const WindItem = styled.div`
	transform: rotate(${props => props.rotate });
	display: flex;
	justify-content: center;
	align-items: center;
`

