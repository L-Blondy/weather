import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles/styles.css"
import { Navbar, Home, Footer, Result } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import { fadeIn } from "./styles/keyframes";
import { fetchDaily, fetchCurrent, fetchHourly, reduceCurrent, reduceHourly, getLocalTime } from "./helpers/helpers";

class App extends React.Component {

	state = {
		placeFullName: null,
		localTime: null,
		hourlyData: null,
		dailyData: null,
		currentData: null,
		query: null,
		offsetTime: null,
	}

	handleSearch = async ( placeFullName, history, latlng ) => {

		this.setState( {
			placeFullName,
			localTime: null,
			hourlyData: null,
			dailyData: null,
			currentData: null,
			query: null,
			offsetTime: null,
		} )
		history.push( '/Result' )

		const key1 = "4db924c717d24ebebe5bfae8f25c6c35";
		const key2 = "5a1b838c8e3440a8bf6a2d302170a6ed"
		fetchDaily( `https://api.weatherbit.io/v2.0/forecast/daily?lon=${ latlng.lng }&lat=${ latlng.lat }&key=${ key1 }` )
			.then( dailyData => {
				this.setState( {
					dailyData,
				} )
			} )
		const current_raw = fetchCurrent( `https://api.weatherbit.io/v2.0/current?lon=${ latlng.lng }&lat=${ latlng.lat }&key=${ key2 }` )
		const hourly_raw = fetchHourly( `http://www.7timer.info/bin/api.pl?lon=${ latlng.lng }&lat=${ latlng.lat }&product=civil&output=json` )


		/**************************************************/
		// const dailyData = [ { "ts": 1571036460, "sunrise": 1571061209, "sunset": 1571102253, "moonrise": 1571105475, "moonset": 1571070220, "date": "Oct 14", "temperature": 21, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "ts": 1571122860, "sunrise": 1571147654, "sunset": 1571188583, "moonrise": 1571193834, "moonset": 1571160143, "date": "Oct 15", "temperature": 22, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "ts": 1571209260, "sunrise": 1571234098, "sunset": 1571274913, "moonrise": 1571282398, "moonset": 1571246543, "date": "Oct 16", "temperature": 23, "icon": "c03d", "weather": "Broken clouds", "origin": "weatherbit" }, { "ts": 1571295660, "sunrise": 1571320543, "sunset": 1571361244, "moonrise": 1571371237, "moonset": 1571336499, "date": "Oct 17", "temperature": 21, "icon": "c02d", "weather": "Scattered clouds", "origin": "weatherbit" }, { "ts": 1571382060, "sunrise": 1571406989, "sunset": 1571447577, "moonrise": 1571460416, "moonset": 1571426411, "date": "Oct 18", "temperature": 20, "icon": "c02d", "weather": "Few clouds", "origin": "weatherbit" }, { "ts": 1571468460, "sunrise": 1571493435, "sunset": 1571533910, "moonrise": 1571549969, "moonset": 1571516181, "date": "Oct 19", "temperature": 20, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571554860, "sunrise": 1571579881, "sunset": 1571620244, "moonrise": 1571639884, "moonset": 1571605726, "date": "Oct 20", "temperature": 21, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571641260, "sunrise": 1571666328, "sunset": 1571706579, "moonrise": 1571643695, "moonset": 1571695005, "date": "Oct 21", "temperature": 25, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571727660, "sunrise": 1571752775, "sunset": 1571792914, "moonrise": 1571734102, "moonset": 1571784027, "date": "Oct 22", "temperature": 26, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571814060, "sunrise": 1571839223, "sunset": 1571879251, "moonrise": 1571824607, "moonset": 1571872844, "date": "Oct 23", "temperature": 24, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571900460, "sunrise": 1571925671, "sunset": 1571965589, "moonrise": 1571915146, "moonset": 1571961527, "date": "Oct 24", "temperature": 27, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1571986860, "sunrise": 1572012120, "sunset": 1572051928, "moonrise": 1572005688, "moonset": 1572050157, "date": "Oct 25", "temperature": 28, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1572073260, "sunrise": 1572098568, "sunset": 1572138269, "moonrise": 1572096229, "moonset": 1572138816, "date": "Oct 26", "temperature": 27, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1572159660, "sunrise": 1572185018, "sunset": 1572224610, "moonrise": 1572186759, "moonset": 1572227583, "date": "Oct 27", "temperature": 23, "icon": "c02d", "weather": "Scattered clouds", "origin": "weatherbit" }, { "ts": 1572246060, "sunrise": 1572271467, "sunset": 1572310952, "moonrise": 1572277248, "moonset": 1572316523, "date": "Oct 28", "temperature": 22, "icon": "c01d", "weather": "Clear Sky", "origin": "weatherbit" }, { "ts": 1572332460, "sunrise": 1572357917, "sunset": 1572397296, "moonrise": 1572367631, "moonset": 1572405682, "date": "Oct 29", "temperature": 19, "icon": "c02d", "weather": "Scattered clouds", "origin": "weatherbit" } ]
		// this.setState( {
		// 	dailyData,
		// } )
		// const currentWeather = { "hour": 16, "hour_english": "4pm", "prec_amount": 0, "timepoint": 0, "timezone": "America/Chicago", "timestamp": 1571061180, "temp2m": 18, "wind10m": { "direction": "ESE", "speed": 3 }, "rh2m": 72, "icon": "c04d", "weather": "Overcast clouds", "origin": "weatherbit" }
		/**************************************************/


		Promise.all( [ current_raw, hourly_raw ] )
			.then( resp => {
				const current = resp[ 0 ];
				const hourly = resp[ 1 ];

				const currentData = reduceCurrent( current );
				const localTime = getLocalTime( currentData.timezone );
				const offsetTime = localTime.zone.offset / 60;
				const hourlyData = reduceHourly( hourly, offsetTime );

				this.setState( {
					offsetTime,
					localTime,
					currentData,
					hourlyData
				} )
			} )
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
								localTime={ this.state.localTime }
								dailyData={ this.state.dailyData }
								hourlyData={ this.state.hourlyData }
								currentData={ this.state.currentData }
								offsetTime={ this.state.offsetTime }
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

	.LazyLoad {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: -1;
	}

	.background-image {
		position: fixed;
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
