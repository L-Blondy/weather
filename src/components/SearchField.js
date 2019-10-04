import React, { useEffect, useRef } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { fadeIn, scaleX } from "../styles/keyframes";
import { global } from "../styles/globalStyles";
import { withRouter } from 'react-router-dom'

function SearchForm ( { handleSearch, history, animated } ) {

	const searchInput = useRef();

	const sentences = [
		"Florence, Toscana, Italy".split( "" ),
		"Paris, Île-de-France, France".split( "" ),
		"Rio de Janeiro, Brazil".split( "" ),
		"Istanbul, Turkey".split( "" ),
		"Haiphong, Vietnam".split( "" ),
		"Montreal, Québec, Canada".split( "" ),
		"Havana, La Habana, Cuba".split( "" ),
		"La Plata, Buenos Aires, Argentina".split( "" ),
		"Nairobi, Kenya".split( "" ),
		"Barcelona, Catalunya, Spain".split( "" ),
	];

	useEffect( () => { //Placeholder effect only on Homepge search field
		if ( !animated ) return;

		let letterIndex = 0;
		let sentence = 0;
		const timeout = 170
		let frameID;
		const input = searchInput.current.querySelector( ".ap-nostyle-input" )

		frameID = window.requestAnimationFrame( animPlaceholder )
		const restartID = frameID + timeout;

		function animPlaceholder () {
			if ( frameID >= restartID ) { //timeout of ${timeout} frames
				if ( frameID % 5 === 0 && letterIndex < sentences[ sentence ].length ) {
					input.placeholder += sentences[ sentence ][ letterIndex ];
					letterIndex++
				}
				if ( ( frameID + timeout ) % 300 === 0 ) {
					input.placeholder = "";
					letterIndex = 0;
					sentence < sentences.length - 1 ? sentence++ : sentence = 0;
				}
			}
			frameID = window.requestAnimationFrame( animPlaceholder )
		}
		return () => window.cancelAnimationFrame( frameID )
	}, [ animated, sentences ] )

	return (
		<SearchField_styled className="search-field" ref={ searchInput } animated={ animated }>
			<AlgoliaPlaces
				placeholder=""

				onChange={ ( { suggestion } ) => {
					const fullISO = suggestion.name + "," + suggestion.countryCode
					handleSearch( fullISO, history );
				} }

				options={ {
					appId: "pl8X2ZGNUAZU",
					apiKey: "7b2200ebe7e913fe219c6010ed67753b",
					type: "city",
					language: "en",
					aroundLatLngViaIP: true,
					style: false,
					templates: {
						value: function ( suggestion ) {
							return suggestion.name + ", " + suggestion.country;
						},
						suggestion: function ( { name, country } ) {
							return name + ', ' + country;
						}
					},
					getRankingInfo: true
				} }
			/>
			<SearchIcon className="search-icon" onClick={ () => handleSearch( document.querySelector( ".ap-nostyle-input" ).value, history ) } />
		</SearchField_styled>
	)
}

const SearchField_styled = styled.div`
	position: relative;
	display: inline-block;

	.ap-nostyle-input {
		position: relative;
		border: none;
		height: 2.5rem;
		min-width: 300px;
		width: 32vw;	
		max-width: 500px;
		padding: 0 2.5rem 0 7px;
		background: none;
		font-size: 1.2rem;
		letter-spacing: 1px;
		color: ${global.fontColor.primary };;
		font-family: ${global.fontFamily.secondary };
		text-transform: capitalize;
		border-radius: 2px;

		&::placeholder {
			color: ${global.fontColor.primary };;
			opacity: 0.4;
			letter-spacing: 1px;
			user-select: none;
		}
		&:focus {
			outline: none;
			background-image: linear-gradient(  #00000030 , transparent 45%);
		}
	}
	.algolia-places-nostyle::before {
		position: absolute;
		content: "";
		height: 2px;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #777;
		z-index: 2;
		transform-origin: left;
		transform: scaleX( 0 );
		animation: ${ scaleX } ${ props => props.animated ? "1500ms 200ms" : "0ms" } forwards;
	}
	.ap-nostyle-input-icon {
		width: 0;
		display: none;
	}
	.search-icon {
		height: 1.7rem;
		width: 1.7rem;
		position: absolute;
		bottom: 7px;
		right: 7px;
		cursor: pointer;
		transition: transform 300ms, filter 300ms;
		color: ${global.fontColor.primary };
		opacity: 0;
		animation: ${fadeIn( 1 ) } ${ props => props.animated ? "3000ms 1000ms" : "0ms" } forwards;

		&:hover {
			transform: scale(1.15);
			filter: brightness(15%);
		}
	}
	.ap-nostyle-dropdown-menu {
		font-family: ${global.fontFamily.secondary };
		width: 100%;
		padding: 0.5rem;
		color: ${global.fontColor.primary };
		font-size: 1.1rem;
		letter-spacing: 1px;
		background: #00000007;
		line-height: 1.2rem;

		.ap-footer {
			display: none;
		}
	}
	.ap-nostyle-cursor {
		background: #00000040;
	}
	.ap-nostyle-suggestion {
		padding: 5px 10px;
		cursor: pointer;
		
		.ap-suggestion-icon {
			display: none;
		}
		em {
			font-style: normal;
			color: inherit;
			font-weight: bold;
		}
		&.selected {
			background: #00000040
		}
	}
	
	@media (max-width: 1024px) {
		display: none;
	}
`;

export default withRouter( SearchForm );