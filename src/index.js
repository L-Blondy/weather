import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles/styles.css"
import { Navbar, Home, Footer, Result } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import { fadeIn } from "./styles/keyframes";
import { fetchDaily, fetchCurrent, fetchHourly, getDay1Index } from "./helpers/helpers";

class App extends React.Component {

	state = {
		fullISO: null,
		dailyData: null,
		hourlyData: null,
		currentWeather: null,
		query: null,
	}

	handleSearch = async ( fullISO, placeFullName, history ) => {
		this.setState( {
			placeFullName,
		} )
		const clearSearchField = () => { document.querySelector( ".ap-nostyle-icon-clear" ).click() }

		/*
		const key1 = "4db924c717d24ebebe5bfae8f25c6c35";
		const key2 = "5a1b838c8e3440a8bf6a2d302170a6ed"

		fetchDaily( `https://api.weatherbit.io/v2.0/forecast/daily?city=${ fullISO }&key=${ key1 }` )
			.then( dailyData => {
				console.log( "Daily Data Loaded" )
				this.setState( {
					dailyData,
				} )
			} )
			
			const currentWeather = fetchCurrent( `https://api.weatherbit.io/v2.0/current?city=${ fullISO }&key=${ key2 }` )
		*/
		const currentWeather = { "timepoint": 0, "hour": 15, "temp2m": 19.8, "wind10m": { "direction": "NNE", "speed": 4 }, "rh2m": 82, "imgSrc": "./assets/weather/few_clouds_night.svg", "weather": "Few clouds" }

		const hourlyData = fetchHourly( "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civil&output=json" )

		const day1_index = getDay1Index();

		Promise.all( [ currentWeather, hourlyData ] )
			.then( resp => {
				const current = resp[ 0 ];
				const hourly = resp[ 1 ];

				return {
					0: [ current, ...hourly.slice( 0, 7 ) ],
					1: hourly.slice( day1_index, day1_index + 8 ),
					2: hourly.slice( day1_index + 8, day1_index + 16 ),
					3: hourly.slice( day1_index + 16, day1_index + 24 ),
					4: hourly.slice( day1_index + 24, day1_index + 32 ),
					5: hourly.slice( day1_index + 32, day1_index + 40 ),
					6: hourly.slice( day1_index + 40, day1_index + 48 ),
					7: hourly.slice( day1_index + 48, day1_index + 56 ),
				}
			} )
			.then( hourlyData => {
				console.log( "Hourly Data Loaded" );
				this.setState( {
					hourlyData,
				} )
			} )

		history.push( '/Result' )
		clearSearchField()
	}

	render () {
		return (
			<Router >
				<AppStyled className="app">

					<Navbar handleSearch={ this.handleSearch } />

					<LazyLoad>
						<div className="background-image" ></div>
					</LazyLoad>

					<Route
						path="/"
						exact
						render={ () => (
							<Home handleSearch={ this.handleSearch } />
						) }
					/>
					<Route
						path="/Result"
						render={ props => (
							<Result
								{ ...props }
								place={ this.state.placeFullName }
								dailyData={ this.state.dailyData }
								hourlyData={ this.state.hourlyData }
							/>
						) }
					/>
					<Footer />
				</AppStyled>
			</Router >
		)
	}
}

const AppStyled = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;

	.LazyLoad {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: -1;
	}

	.background-image {
		height: 100%;
		width: 100%;
		opacity: 0.4;
		animation: ${fadeIn( 0.4 ) } 2000ms;
		background-image: url("../assets/sun2.png" );
		background-position: center;
		background-size: cover;
	}
`

ReactDOM.render( <App />, document.getElementById( "root" ) );
