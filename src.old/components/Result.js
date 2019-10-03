import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Daily, Hourly } from ".";

export default function Result ( { place, time, dailyData } ) {

	const Result = Result_styles()

	return (
		<Result>

			<div className="place-time">
				<p className="place">{ place }</p>
				<p className="time">{ time }</p>
			</div>

			<Daily dailyData={ dailyData } />

			<div>HOURLY</div>

			<div className="details">
				<h4>DAY DETAILS</h4>
			</div>

		</Result >
	)
}

const Result_styles = () => styled.div`
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
