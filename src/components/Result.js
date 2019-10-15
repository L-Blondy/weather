import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Caroussel, Graph } from "./";

export default function Result ( { place, dailyData, hourlyData } ) {

	const [ activeDay, setActiveDay ] = React.useState( 0 );
	const [ graphType, setGraphType ] = React.useState( "classic" );

	const setCurrentActive = ( e ) => {
		setActiveDay( parseInt( e.target.dataset.index ) )
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
				<div className="daily-header-wrapper header-wrapper" >
					<h4 className="h4-daily">DAILY</h4>
				</div>

				<Caroussel
					dailyData={ dailyData }
					setCurrentActive={ setCurrentActive }
					activeDay={ activeDay }
				/>
			</div >

			<div className="hourly">
				<div className="hourly-header-wrapper header-wrapper" >
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
				<div className="details-header-wrapper header-wrapper" >
					<h4>DAY DETAILS</h4>
				</div>
			</div>

		</ResultStyled >
	)
}

const ResultStyled = styled.div`
	height: 100%;
	font-family: ${ global.fontFamily.ternary };
	color: ${ global.fontColor.dark };
	padding: 2rem 20vw 0 20vw;
		
	@media (max-width: 1280px){
		padding: 2rem 15vw 0 15vw;
	}
	
	@media (max-width: 1024px){
		padding: 2rem 8vw 0 8vw;
	}
	
	.place-time {
		text-align: center;
		font-weight: normal;
		font-family: ${ global.fontFamily.secondary };
	
		.place {
			font-size: 2rem;
		}
		.time {
			font-size: 3rem;
		}
	}

	.header-wrapper {
		margin: 2rem 0 0.5rem 0;
	}
	
	h4 {
		font-family: ${ global.fontFamily.secondary };
		font-size: 1.3rem;
		font-weight: bold;
	}
	
	.hourly-header-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
		button {
			background: none;
			border: none;
			padding: 0.2rem 1rem;
			cursor: pointer;
			font-family:${ global.fontFamily.secondary };
			color: ${ global.fontColor.dark + "bb" };
			font-size: 0.9rem;
			border-radius: 4px;
			margin: 0 0.2rem;
			min-width: 6rem;
			outline: none;

			&:hover, &:focus {
				color: ${ global.fontColor.dark };
				background: #ffffff40;
			}

			&.active {
				color: ${ global.fontColor.dark + "dd" };
				background: #ffffffcc;
				box-shadow: 0 0 5px 0 #00000020;
			}
		}
	}

	.hourly {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-right: 2rem;
	
		@media (max-width: 600px) {
			padding-right: 0;
		}
	}

	.details {
		box-shadow: 0 0 0 1px black;
		min-height: 12rem;
	}
	.details-header-wrapper {
		box-shadow: 0 0 0 1px black;
	}

`
