import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Caroussel, Graph } from "./";

export default function Result ( { place, dailyData, hourlyData } ) {

	const [ activeDay, setActiveDay ] = React.useState( 0 );
	const [ graphType, setGraphType ] = React.useState( "classic" );

	const setCurrentActive = ( index ) => {
		setActiveDay( index )
	}

	const getTime = () => {
		const d = new Date(); // for now
		const hour = d.getHours();
		const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
		return hour + ":" + minutes;
	}

	return (
		<ResultStyled>

			<div className="place-time">
				<p className="place">{ place ? place : "Naples, Italy" }</p>
				<p className="time">{ getTime() }</p>
			</div>

			<div className="daily" >
				<h4 className="h4-daily">DAILY</h4>

				<Caroussel
					dailyData={ dailyData }
					setCurrentActive={ setCurrentActive }
					activeDay={ activeDay }
				/>
			</div >

			<div className="hourly">
				<div className="hourly-header-wrapper" >
					<h4 className="h4-hourly">HOURLY</h4>
					<div className="hourly-header-wrapper__buttons" >
						<button className={ graphType === "classic" ? "active" : "" } data-type="classic" onClick={ ( e ) => setGraphType( e.target.dataset.type ) } >Classic</button>
						<button className={ graphType === "precip" ? "active" : "" } data-type="precip" onClick={ ( e ) => setGraphType( e.target.dataset.type ) }  >Precipitation</button>
					</div>
				</div>
				<Graph
					hourlyData={ hourlyData }
					activeDay={ activeDay }
					graphType={ graphType }
				/>
			</div>

			<div className="details">
				<h4>DAY DETAILS</h4>
			</div>

		</ResultStyled >
	)
}

const ResultStyled = styled.div`
	height: 100%;
	font-family: ${ global.fontFamily.ternary };
	color: ${ global.fontColor.primary };
	padding: 2rem 8vw 0 8vw;

	.hourly-header-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 1rem 0 0.5rem 0;

		button {
			background: none;
			border: none;
			padding: 0.2rem 1rem;
			cursor: pointer;
			font-family:${ global.fontFamily.secondary };
			color: ${ global.fontColor.primary + "bb" };
			border-radius: 4px;
			margin: 0 0.2rem;
			min-width: 6rem;
			outline: none;

			&:hover, &:focus {
				color: ${ global.fontColor.primary };
				background: #ffffff40;
			}

			&.active {
				color: ${ global.fontColor.primary + "dd" };
				background: #ffffffcc;
				box-shadow: 0 0 5px 0 #00000020;
			}
		}
	}
	.hourly-header-wrapper__buttons {
		margin-right: 2rem;
	}
		
	h4 {
		font-family: ${ global.fontFamily.secondary };
		font-size: 1.3rem;
		font-weight: bold;

		&.h4-hourly {
			margin: 1rem 0 0 0;
		}
	}
	
	.place-time {
		text-align: center;
		font-weight: normal;
		font-family: ${ global.fontFamily.secondary };

		.place {
			font-size: 2rem;
		}
		.time {
			font-size: 3.5rem;
		}
	}
`
