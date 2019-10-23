import React from 'react';
import styled from 'styled-components';
import ThemeContext from "../ThemeContext";
import { ReactComponent as LoadingCircle } from "../assets/loading-circle.svg";
import { PieChart, Pie } from 'recharts';

export default function Humidity ( { dailyData, activeDay, className } ) {
	const theme = React.useContext( ThemeContext )
	const pieSize = 70;
	let data_daily;
	let data_humidity;
	let data_precip;

	if ( dailyData ) {
		data_daily = dailyData[ activeDay ];
		data_humidity = [
			{ rh: 100 - data_daily.rh },
			{ rh: data_daily.rh },
		]
		data_precip = [
			{ precip: 7 - data_daily.precip_lvl },
			{ precip: data_daily.precip_lvl },
		]
	}

	return !( dailyData ) ?
		(
			<div className={ "loading-container " + className }>
				<LoadingCircle />
			</div>
		) : (
			<HumidityStyled className={ className } theme={ theme } >

				<div className="another-grid">

					<div className="grid-item precipitation" >
						<span>{ "Precipitation" }</span>
						<div className="pie-chart">
							<span>
								{ `${ data_daily.precip }mm` }
							</span>
							<PieChart width={ pieSize } height={ pieSize } >
								<Pie
									innerRadius={ pieSize / 2 - pieSize / 8 }
									outerRadius={ pieSize / 2 }
									data={ data_precip }
									dataKey="precip"
									startAngle={ 90 }
									endAngle={ 450 }
								/>
							</PieChart>
						</div>
					</div>

					<div className="grid-item humidity" >
						<span>{ "Humidity" }</span>
						<div className="pie-chart">
							<span className="value">
								{ `${ data_daily.rh }%` }
							</span>
							<PieChart width={ pieSize } height={ pieSize } >
								<Pie
									innerRadius={ pieSize / 2 - pieSize / 8 }
									outerRadius={ pieSize / 2 }
									data={ data_humidity }
									dataKey="rh"
									startAngle={ 90 }
									endAngle={ 450 }
								/>
							</PieChart>
						</div>
					</div>
				</div>

			</HumidityStyled>
		)
}

const HumidityStyled = styled.div`
	font-family: ${ props => props.theme.fontFam.primary };
	display: flex;
	justify-content: center;

	.another-grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, minmax( 1rem, 6rem));
		place-items: center;
		grid-gap: 0.5rem 1rem;
		margin-top: 1rem;
	}

			
	.grid-item {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		& > span {
			height: 2rem;
		}
	}

	.minmax-display {
		display: flex;
		align-items: center;
		flex-grow: 1;

		.temp-icon {
			height: 2.5rem;
		}
		& > span {
			margin-left: 0.5rem;
			font-size: 1.1rem;
		}
	}

	.pie-chart {
		position: relative;

		& > span {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.recharts-pie-sector:nth-child(1) > path {
			fill: #2277c64d;
			stroke: none;
		}
		.recharts-pie-sector:nth-child(2) > path {
			fill: #0b6ac1bb;
			stroke: none;
		}
	}
`
