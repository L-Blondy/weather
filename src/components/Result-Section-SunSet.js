import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { convertTS_toDate } from "../helpers/helpers";
import { ReactComponent as Sun } from "../assets/weather/ClearDay.svg";
import { ReactComponent as Moon } from "../assets/weather/ClearNight.svg";
import { ReactComponent as LoadingCircle } from "../assets/loading-circle.svg"

export default function SunSet ( { className, dailyData, activeDay, offsetTime } ) {

	const daily = dailyData && dailyData[ activeDay ]
	const sunrise = dailyData && convertTS_toDate( daily.sunrise, offsetTime ).slice( 17, 22 );
	const sunset = dailyData && convertTS_toDate( daily.sunset, offsetTime ).slice( 17, 22 );
	const moonrise = dailyData && convertTS_toDate( daily.moonrise, offsetTime ).slice( 17, 22 );
	const moonset = dailyData && convertTS_toDate( daily.moonset, offsetTime ).slice( 17, 22 );

	return !dailyData ?
		(
			<div className={ "loading-container " + className }>
				<LoadingCircle />
			</div>
		) : (
			<SunSetStyled className={ className } >
				<div className="sun-grid">
					<div className="sm-section sunrise">
						<div className="sm-section__description">Sunrise</div>
						<div className="sm-section__content">
							<Sun className="sm-icon sun-icon" />
							<span>{ sunrise }</span>
						</div>
					</div>
					<div className="sm-section moonrise">
						<div className="sm-section__description">Moonrise</div>
						<div className="sm-section__content">
							<Moon className="sm-icon moon-icon" />
							<span>{ moonrise }</span>
						</div>
					</div>
					<div className="sm-section sunset">
						<div className="sm-section__description">Sunset</div>
						<div className="sm-section__content">
							<Sun className="sm-icon sun-icon" />
							<span>{ sunset }</span>
						</div>
					</div>
					<div className="sm-section moonset">
						<div className="sm-section__description">Moonset</div>
						<div className="sm-section__content">
							<Moon className="sm-icon moon-icon" />
							<span>{ moonset }</span>
						</div>
					</div>
				</div>
			</SunSetStyled>
		)
}

const SunSetStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	font-family: ${global.fontFamily.primary };

	.sun-grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, minmax( 1rem, 6rem));
		grid-template-rows: 1fr 1fr;
		grid-gap: 0.5rem 1rem;
		margin-top: 1rem;
	}

	.sm-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		.sm-section__description {
			font-size: 0.9rem;
			line-height: 1.5rem;
		}

		.sm-section__content {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.sm-icon {
				height: 30px;
			}
			.sm-icon + span {
				margin-left: 0.5rem;
			}
		}
	}
	

	
				
`