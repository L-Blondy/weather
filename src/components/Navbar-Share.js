import React, { Component } from 'react';
import enhanceWithClickOutside from "react-click-outside";
import styled from 'styled-components';

class Share extends Component {

	state = {
		active: false
	}

	componentDidMount = () => {
		console.log( "MOUNT" )
	}

	toggleShare = ( e ) => {
		console.log( e.target )
		this.setState( {
			active: !this.state.active
		} )
	}

	handleClickOutside = ( e ) => {
		console.log( e.target )
		this.setState( {
			active: false
		} )
	}

	render () {
		return (
			<li className="share-link">
				<a className={ "navlink  share " + `${ this.state.active ? "active " : "" }` } onClick={ this.toggleShare }>Share</a>
				<ul className="float">
					<li><a>Facebook</a></li>
					<li><a>Twitter</a></li>
					<li><a>LinkedIn</a></li>
				</ul>
			</li>
		)
	}
}

export default enhanceWithClickOutside( Share )