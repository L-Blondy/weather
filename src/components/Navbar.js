import React from 'react';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { NavLink } from "react-router-dom";
import { SearchField, Share } from "./";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";

export default function Navbar ( { handleSearch } ) {

	const [ enabled, setEnabled ] = React.useState( "disabled" )

	const enableSearch = ( e ) => {
		if ( enabled === "disabled" ) {
			window.addEventListener( "click", cb );
		}
		if ( e.target !== document.querySelector( ".ap-nostyle-icon-clear" ) ) {
			document.querySelector( ".ap-nostyle-input" ).focus();
		}
		if ( e.target !== document.querySelector( ".ap-nostyle-input" ) ) {
			document.querySelector( ".ap-nostyle-icon-clear" ).click()
		}
		setEnabled( "enabled" );

		function cb ( e ) {
			if ( !document.querySelector( ".search-button" ).contains( e.target ) ) {
				setEnabled( "disabled" );
				window.removeEventListener( "click", cb )
			}
		}
	}

	return (
		<NavbarStyled >
			<span className="logo">AccuWeather</span>

			<NavLinks className="navlinks">
				<li >
					<button className="navlink search-button" onClick={ enableSearch }>
						<HomeIcon height={ iconSize } width={ iconSize } />
						<SearchField className={ "searchField " + enabled } handleSearch={ handleSearch } />
						<span>Search</span>
					</button>
				</li>

				<li>
					<NavLink className="navlink" to="/">
						<HomeIcon height={ iconSize } width={ iconSize } />
						<span>Home</span>
					</NavLink>
				</li>

				<li>
					<button className="navlink">
						<HomeIcon height={ iconSize } width={ iconSize } />
						<span>Theme</span>
					</button>
				</li>

				<li>
					<button className="navlink share-button">
						<ShareIcon height={ iconSize } width={ iconSize } />
						<span>Share</span>
					</button>
				</li>

			</NavLinks>
		</NavbarStyled>
	)
}

const iconSize = "1.3rem";

const NavbarStyled = styled.div`
	background-image: linear-gradient(transparent, #ffffff20);
	color: ${global.fontColor.dark };
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${global.navbar_height };
	box-shadow: 0 0 50px 0 #26374f15;

	.logo {
		margin-left: calc(20px + 5%);
		font-family: Coda;
		font-size: 1.8rem;
		user-select: none;
		color: inherit;
	}
	.navlinks {
		margin-right: calc(20px + 5%);
	}
`

const NavLinks = styled.ul`
	list-style: none;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 40%;
	max-width: 550px;

	.navlink {
		position: relative;
		border: none;
		text-decoration: none;
		color: inherit;
		font-family: ${global.fontFamily.secondary };
		font-size: 1rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		padding : 0.4rem 1rem;
		display: flex;
		align-items: center;
		cursor: pointer;
		background: none;

		&:focus, 
		&:hover,
		&:hover .search-icon {
			outline: none;
			color: #a5a5a5;
			transition: color 150ms;
		}

		& > span {
			margin: 0 0.4rem;
		}

		&.share-button {
			color: white;
			background: ${global.btnClr.primary };
			border-radius: 7px;
			transition: background 250ms 40ms;

			&:hover {
				background: ${global.btnClr.secondary };
			}
		}
		&.search-button svg:first-of-type {
			opacity: 0;
		}
	}

	.searchField {
		position: absolute;
		left: 0;
		transform-origin: left;
		transform: scale(0.8) translateX(calc( -100% + 3.3rem));
		transition: transform 500ms 100ms;
		pointer-events: none;

		@media (max-width: 1024px){
			display: inline-block;
		}
		.clear-icon {
			z-index: 500;
		}

		.algolia-places-nostyle {
			transform-origin: right;
			transition: transform 500ms 100ms;

			&::before {
				animation: none;
				transform-origin: right;
				transform: scaleX(0);
				transition: transform 500ms 100ms;
			}
		}
		.ap-nostyle-input {
			max-width: 300px;
			opacity: 0;
			transition: opacity 500ms 100ms;
		}
		.ap-nostyle-input:focus {
			background: none;
		}
	}
	.search-button:focus-within { 
		.searchField {
			transform: scale(0.8) translateX(calc( -115% + 3.3rem));
			pointer-events: initial;
		}
		
		.ap-nostyle-input {
			opacity: 1;
		}

		.algolia-places-nostyle::before {
			transition: transform 500ms 100ms;
			transform: scaleX(1);
		}
	}
	.searchField.disabled:not(:focus-within) { 
		.search-icon {
			visibility: visible;
		}
		.clear-icon {
			visibility: hidden;
		}
	}
`