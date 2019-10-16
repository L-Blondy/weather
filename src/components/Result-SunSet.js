import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles"
import { convertTS_toDate } from "../helpers/helpers";
import { ReactComponent as Sun } from "../assets/weather/ClearDay.svg"
import { ReactComponent as Moon } from "../assets/weather/ClearNight.svg"

export default function SunSet ( { dailyData, hourlyData, currentData, activeDay, offsetTime } ) {

	const daily = dailyData[ activeDay ]
	const sunrise = convertTS_toDate( daily.sunrise, offsetTime ).slice( 17, 22 );
	const sunset = convertTS_toDate( daily.sunset, offsetTime ).slice( 17, 22 );
	const moonrise = convertTS_toDate( daily.moonrise, offsetTime ).slice( 17, 22 );
	const moonset = convertTS_toDate( daily.moonset, offsetTime ).slice( 17, 22 );

	if ( dailyData && hourlyData && currentData ) {

	}

	return (
		<SunSetStyled >
			<div className="sm-section sunrise">
				<span>
					<div className="sm-section__description">Sunrise</div>
					<div className="sm-section__content">
						<Sun className="sm-icon sun-icon" />
						<span>{ sunrise }</span>
					</div>
				</span>
			</div>
			<div className="sm-section moonrise">
				<span>
					<div className="sm-section__description">Moonrise</div>
					<div className="sm-section__content">
						<Moon className="sm-icon moon-icon" />
						<span>{ moonrise }</span>
					</div>
				</span>
			</div>
			<div className="sm-section sunset">
				<span>
					<div className="sm-section__description">Sunset</div>
					<div className="sm-section__content">
						<Sun className="sm-icon sun-icon" />
						<span>{ sunset }</span>
					</div>
				</span>
			</div>
			<div className="sm-section moonset">
				<span>
					<div className="sm-section__description">Moonset</div>
					<div className="sm-section__content">
						<Moon className="sm-icon moon-icon" />
						<span>{ moonset }</span>
					</div>
				</span>
			</div>
		</SunSetStyled>
	)
}

const SunSetStyled = styled.div`
	position: relative;
	border-top: 1px solid ${ global.fontColor.dark + "70" };
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;

	.sm-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.sm-section__description {
			font-size: 0.9rem;
			line-height: 1.5rem;
			font-family: ${global.fontFamily.primary };
		}

		.sm-section__content {
			display: flex;
			align-items: center;

			.sm-icon {
				height: 30px;
			}
			.sm-icon + span {
				margin-left: 0.5rem;
			}
		}
	}
	

	
				
`