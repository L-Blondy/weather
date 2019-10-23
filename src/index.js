import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles/styles.css"
import { Navbar, Home, Footer, Result } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fadeIn } from "./styles/keyframes";
import { fetchDaily, fetchHourly, reduceDaily, reduceHourly, getLocalTime } from "./helpers/helpers";
import ThemeContext, { theme } from "./ThemeContext";

class App extends React.Component {

	state = {
		theme: 3,
		placeFullName: null,
		localTime: null,
		hourlyData: null,
		dailyData: null,
		query: null,
		offsetTime: null,
		resize: 0,
		searchCount: 0,
	}

	componentDidMount = () => {
		window.addEventListener( "resize", this.resizeCB )
	}

	componentWillUnmount = () => {
		window.removeEventListener( "resize", this.resizeCB )
	}

	resizeCB = () => {
		this.setState( { resize: this.state.resize + 1 } );
	}

	switchTheme = () => {
		this.setState( {
			theme: this.state.theme < theme.length - 1 ? this.state.theme + 1 : 0
		} )
	}

	handleSearch = async ( placeFullName, history, latlng ) => {

		this.setState( {
			placeFullName,
			localTime: null,
			hourlyData: null,
			dailyData: null,
			query: null,
			offsetTime: null,
			searchCount: this.state.searchCount + 1,
		} )
		history.push( '/Result' )

		let rawDaily;
		const key1 = "4db924c717d24ebebe5bfae8f25c6c35";
		const key2 = "5a1b838c8e3440a8bf6a2d302170a6ed"

		try {
			rawDaily = fetchDaily( `https://api.weatherbit.io/v2.0/forecast/daily?lon=${ latlng.lng }&lat=${ latlng.lat }&key=${ key1 }` )
		}
		catch {
			rawDaily = fetchDaily( `https://api.weatherbit.io/v2.0/forecast/daily?lon=${ latlng.lng }&lat=${ latlng.lat }&key=${ key2 }` )
		}
		finally {
			rawDaily.then( resp => {
				this.setState( {
					timezone: resp.timezone,
					dailyData: reduceDaily( resp.data ),
				} )
			} )
		}

		fetchHourly( `http://www.7timer.info/bin/api.pl?lon=${ latlng.lng }&lat=${ latlng.lat }&product=civil&output=json` )
			.then( hourly => {
				const localTime = getLocalTime( this.state.timezone );
				const offsetTime = localTime.zone.offset / 60;
				const hourlyData = reduceHourly( hourly, offsetTime );

				this.setState( {
					offsetTime,
					localTime,
					hourlyData
				} )
			} )
	}

	render () {
		return (
			<Router >
				<ThemeContext.Provider value={ theme[ this.state.theme ] } >
					<AppStyled className="app" theme={ theme[ this.state.theme ] }>

						<Navbar
							handleSearch={ this.handleSearch }
							searchCount={ this.state.searchCount }
							switchTheme={ this.switchTheme }
						/>

						<div className="background-image" ></div>

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
									offsetTime={ this.state.offsetTime }
									resize={ this.state.resize }
								/>
							) }
						/>
						<Footer />
					</AppStyled>
				</ThemeContext.Provider>
			</Router >
		)
	}
}

const AppStyled = styled.div`
	position: relative;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow-x: hidden;

	.LazyLoad {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: -1;
	}

	.background-image {
		position: fixed;
		z-index: -1;
		height: 100%;
		width: 100%;
		opacity: 0;
		filter: ${props => props.theme.bkgIMG.filter };
		animation: ${props => fadeIn( props.theme.bkgIMG.opacity ) } 2000ms forwards;
		background-image: ${props => props.theme.bkgIMG.url };
		background-position: right top;
		background-size: cover;
	}

	.st0 {
		fill: ${props => props.theme.icons.st0 };
	}
	.st1 {
		fill: ${props => props.theme.icons.st1 };
	}
	.st2 {
		fill: ${props => props.theme.icons.st2 };
	}
	.st3 {
		fill: ${props => props.theme.icons.st3 };
	}
`

ReactDOM.render( <App />, document.getElementById( "root" ) );

{/* .background-image {
		position: fixed;
		z-index: -1;
		height: 100%;
		width: 100%;
		opacity: 0;
		animation: ${fadeIn( 0.30 ) } 2000ms forwards;
		background-image: ${props => props.bkgIMG };
		background-position: right top;
		background-size: cover;
	} */}
