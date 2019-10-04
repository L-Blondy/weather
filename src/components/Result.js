import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Caroussel } from "./";

export default function Result ( { place, time, dailyData } ) {

	return (
		<Result_styled>

			<div className="place-time">
				<p className="place">{ place }</p>
				<p className="time">{ time }</p>
			</div>

			<div className="daily" >
				<h4>DAILY</h4>
				<Caroussel dailyData={ dailyData } />
			</div >

			<div className="hourly">
				<h4>HOURLY</h4>
			</div>

			<div className="details">
				<h4>DAY DETAILS</h4>
			</div>

		</Result_styled >
	)
}

const Result_styled = styled.div`
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
		font-family: ${ global.fontFamily.secondary };
			font-weight: normal;
	
		.place {
				font-size: 2.5rem;
		}
		.time {
				font-size: 3.5rem;
		}
	}
`
