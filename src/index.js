import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles/styles.css"
import { Navbar, Home, Footer, Result } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LazyLoad from 'react-lazy-load';
import { fadeIn } from "./styles/keyframes";
// import Axios from 'axios';
import { reduceDailyData } from "./helpers/helpers";

class App extends React.Component {

	state = {
		fullISO: null,
		dailyData: null
	}

	shouldComponentUpdate = () => false;

	handleSearch = ( fullISO, history ) => {

		// const key1 = "4db924c717d24ebebe5bfae8f25c6c35";
		// const key2 = "5a1b838c8e3440a8bf6a2d302170a6ed"

		// Axios.get( `https://api.weatherbit.io/v2.0/forecast/daily?city=${ fullISO }&key=${ key1 }` )
		// 	.then( resp => { 
		// 		console.log(JSON.stringify(resp.data.data))
		// 		this.setState( { daily: resp.data.data } ) 
		// 	} )
		// 	// .then( () => Axios.get( `https://api.weatherbit.io/v2.0/forecast/hourly?city=${ fullISO }&key=${ key2 }` )
		// 	// 	.then( resp => this.setState( { hourly: resp.data.data } ) )
		// 	.then( () => history.push( '/Search' ) );

		const getFakeDailyData = async () => {
			const resp = await import( "./Daily16data.json" )

			this.setState( {
				dailyData: reduceDailyData( resp.default )
			} )
			history.push( '/Result' )
		}
		getFakeDailyData()
		document.querySelector( ".ap-nostyle-input" ).value = "";
	}

	render () {
		const App = App_styles()
		return (
			<Router >
				<App className="app">

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
								dailyData={ this.state.dailyData }
								place={ "To grab from Hourly" }
								time={ " 12.41 To grab from Hourly" }
							/>
						) }
						onClick={ this.closeFloats }
					/>
					<Footer />
				</App>
			</Router >
		)
	}
}

const App_styles = () => styled.div`
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
