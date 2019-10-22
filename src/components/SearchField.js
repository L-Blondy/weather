import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/search.svg';
import { ReactComponent as ClearIcon } from '../assets/clear.svg';
import { fadeIn, scaleX } from "../styles/keyframes";
import { global } from "../styles/globalStyles";
import { withRouter } from 'react-router-dom'

function SearchForm ( { className, handleSearch, history, animated } ) {

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

	const [ inputVal, setInputVal ] = React.useState();
	const anim = React.useRef();
	const searchInput = React.useRef();

	React.useEffect( () => {
		if ( !animated ) return;

		const input = searchInput.current.querySelector( ".ap-nostyle-input" )
		input.placeholder = "";
		anim.current = { letter: 0, sentence: 0, timeout: 250, countID: 0, restartID: 0 };
		let { letter, sentence, timeout, countID, restartID } = anim.current;
		let frameID = window.requestAnimationFrame( animPlaceholder );
		countID = frameID;
		const startID = countID + timeout;

		function animPlaceholder () {
			countID++;
			if ( countID >= startID ) {
				if ( countID % 5 === 0 && letter < sentences[ sentence ].length ) {
					input.placeholder += sentences[ sentence ][ letter ];
					letter++
				}
				if ( letter === sentences[ sentence ].length - 1 && countID > restartID ) {
					restartID = countID + timeout;
				}
				if ( countID === restartID ) {
					input.placeholder = "";
					letter = 0;
					sentence < sentences.length - 1 ? sentence++ : sentence = 0;
				}
			}
			frameID = window.requestAnimationFrame( animPlaceholder )
		}
		return () => {
			window.cancelAnimationFrame( frameID )
		}
	} )

	const resetInput = () => {
		searchInput.current && searchInput.current.querySelector( ".ap-nostyle-icon-clear" ).click()
		setInputVal( "" );
	}

	return (
		<SearchFieldStyled
			className={ className }
			ref={ searchInput }
			animated={ animated }
			inputVal={ inputVal }
			onChange={ () => {
				setInputVal( searchInput.current.querySelector( ".ap-nostyle-input" ).value )
			} }
		>
			<AlgoliaPlaces
				placeholder=""
				onChange={ ( { suggestion } ) => {
					const PlaceFullName = suggestion.name + "," + suggestion.country;
					resetInput()
					handleSearch( PlaceFullName, history, suggestion.latlng );
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
			<SearchIcon className="search-icon" />
			<ClearIcon className="clear-icon" onClick={ resetInput } />

		</SearchFieldStyled>
	)
}

const SearchFieldStyled = styled.div`
	position: relative;
	display: inline-block;

	.ap-nostyle-input {
		position: relative;
		border: none;
		height: 2.5rem;
		width: 32vw;	
		min-width: 300px;
		max-width: 450px;
		padding: 0 2.5rem 0 7px;
		background: none;
		font-size: 1.2rem;
		letter-spacing: 1px;
		color: currentColor;
		font-family: ${global.fontFamily.secondary };
		text-transform: capitalize;
		border-radius: 2px;

		&::placeholder {
			color: currentColor;
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
		background: currentColor;
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
		opacity: 0;
		visibility: ${props => props.inputVal ? "hidden" : "visible" };
		animation: ${fadeIn( 1 ) } ${ props => props.animated ? "3000ms 1000ms" : "0ms" } forwards;
	}
	.clear-icon {
		height: 1.5rem;
		width: 1.5rem;
		visibility: ${props => props.inputVal ? "visible" : "hidden" };
	}

	.search-icon,
	.clear-icon {
		position: absolute;
		bottom: 7px;
		right: 7px;
		cursor: pointer;
		transition: color 200ms;
		color: currentColor;
	}
	.clear-icon:hover {
		color: red;
	}

	.ap-nostyle-dropdown-menu {
		font-family: ${global.fontFamily.secondary };
		width: 100%;
		padding: 0.5rem;
		color: ${global.fontColor.dark };
		font-size: 1.1rem;
		letter-spacing: 1px;
		background: #00000007;
		line-height: 1.2rem;
		z-index: 10;

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
		text-align: left;
		
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
	@media (max-width: 1024px){
		.ap-nostyle-dropdown-menu {
			letter-spacing: 0;
		}
	}
	@media (max-width: 480px){
		.ap-nostyle-input {
			max-width: 200px;
		}
	}
`

export default withRouter( SearchForm );