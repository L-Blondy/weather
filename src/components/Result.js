import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";
import { Caroussel, Graph, SunSet, Wind, Humidity } from "./";
import { ReactComponent as LoadingGraph } from "../assets/loading-graph.svg"
import { ReactComponent as Loading } from "../assets/loading.svg"

export default function Result ( { place, dailyData, hourlyData, currentData, localTime, offsetTime } ) {

	const [ activeDay, setActiveDay ] = React.useState( 0 );
	const [ graphType, setGraphType ] = React.useState( "classic" );

	const setCurrentActive = ( e ) => {
		setActiveDay( parseInt( e.target.dataset.index ) )
	}

	const getTime = () => {
		const hour = localTime.hours < 10 ? "0" + localTime.hours : localTime.hours;
		const minutes = localTime.minutes < 10 ? "0" + localTime.minutes : localTime.minutes;
		return hour + ":" + minutes
	}

	return (
		<ResultStyled>

			<section className="place-time">
				{ localTime ?
					( <>
						<p className="place">{ place }</p>
						<p className="time">{ getTime() }</p>
					</>
					) : ( <>
						<LoadingGraph />
						<p className="place inactive">s</p>
						<p className="time inactive">s</p>
					</>
					) }

			</section>

			<section className="daily section" >
				<div className="section-title-wrapper">
					<h4 className="h4-daily">DAILY</h4>
				</div>

				<Caroussel
					dailyData={ dailyData }
					setCurrentActive={ setCurrentActive }
					activeDay={ activeDay }
				/>
			</section >

			<section className="hourly section">
				<div className="section-title-wrapper section-title-wrapper__hourly" >
					<h4 className="h4-hourly">HOURLY</h4>
					<div className="hourly-header-wrapper__buttons" >
						<button className={ graphType === "classic" ? "active" : "" } data-type="classic" onClick={ ( e ) => setGraphType( e.target.dataset.type ) } >Classic</button>
						<button className={ graphType === "precip" ? "active" : "" } data-type="precip" onClick={ ( e ) => setGraphType( e.target.dataset.type ) }  >Precipitation</button>
					</div>
				</div>
				{ !hourlyData ?
					(
						<div className="loading-chart">
							<LoadingGraph />
						</div>

					) : (
						<Graph
							hourlyData={ hourlyData }
							activeDay={ activeDay }
							graphType={ graphType }
						/>
					) }
			</section>

			<section className="details section">
				<div className="section-title-wrapper section-title-wrapper__details">
					<h4>DAY DETAILS</h4>
				</div>
				<div className="details-container">
					{ dailyData ?
						(
							<Humidity
								className="details-sub-section"
								dailyData={ dailyData }
								activeDay={ activeDay }
							/>
						) : (
							<div className="loading-container details-sub-section">
								<Loading />
							</div>
						)
					}
					{ dailyData ?
						(
							<Wind
								className="details-sub-section"
								dailyData={ dailyData }
								activeDay={ activeDay }
							/>
						) : (
							<div className="loading-container details-sub-section">
								<Loading />
							</div>
						)
					}
					{ dailyData ?
						(
							<SunSet
								className="details-sub-section"
								dailyData={ dailyData }
								activeDay={ activeDay }
								offsetTime={ offsetTime }
							/>
						) : (
							<div className="loading-container details-sub-section">
								<Loading />
							</div>
						)
					}
				</div>
			</section>

		</ResultStyled >
	)
}

const ResultStyled = styled.div`
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
		position: relative;
		text-align: center;
		font-weight: normal;
		font-family: ${ global.fontFamily.secondary };

		.loading-img {
			height: 40px;
		}
	
		.place {
			font-size: 2rem;
		}
		.time {
			font-size: 3rem;
		}
		.inactive{
			opacity: 0;
		}
	}

	.section {
		margin-top: 1.5rem;
	}

	.section-title-wrapper {
		margin-bottom: 0.5rem;

		h4 {
			font-family: ${ global.fontFamily.secondary };
			font-size: 1.3rem;
			font-weight: bold;
		}
	}
	
	.section-title-wrapper__hourly {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 2rem;
	
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

		.loading-chart {
			position: relative;
			height:  ${global.chartHeight };
			width: 100%;
		}
	
		@media (max-width: 600px) {
			padding-right: 0;
		}
	}

	.details {
		.details-container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 12rem;
			column-gap: 1rem;

			& > div {
				border-top: 1px solid ${global.fontColor.dark + "70" };
			}

			.loading-container {
				position: relative;

				.loading-img {
					height: 40px;
				}
			}
		}
	}
	

`
