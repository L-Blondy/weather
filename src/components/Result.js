import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Caroussel, Graph } from "./";

export default function Result ( { place, dailyData, hourlyData } ) {

	const [ activeDay, setActiveDay ] = React.useState( 0 );

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
				<h4>DAILY</h4>

				<Caroussel
					dailyData={ dailyData }
					setCurrentActive={ setCurrentActive }
					activeDay={ activeDay }
				/>
			</div >

			<div className="hourly">
				<h4>HOURLY</h4>
				<Graph
					hourlyData={ hourlyData }
					activeDay={ activeDay }
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
		
	h4 {
			font-family: ${ global.fontFamily.secondary };
			font-size: 1.3rem;
			font-weight: bold;
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
