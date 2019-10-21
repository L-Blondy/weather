import React from 'react';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { NavLink } from "react-router-dom";
import { SearchField, FloatShare, Burger } from "./";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";

export default function Navbar ( { handleSearch } ) {

	const [ showShare, setShowShare ] = React.useState( "hide-float" );
	const [ enabled, setEnabled ] = React.useState( "disabled" );
	const [ menu, setMenu ] = React.useState( false );

	const toggleMenu = () => {
		if ( !menu ) {
			window.addEventListener( "click", cb )
		}
		if ( menu ) {
			window.removeEventListener( "click", cb )
		}

		function cb ( e ) {
			if ( !document.querySelector( ".navbar" ).contains( e.target ) ) {
				console.log( "out" )
				setMenu( false )
				window.removeEventListener( "click", cb )
			}
		}
		setMenu( !menu )
	}

	const enableSearch = ( e ) => {
		console.log( e.target )
		if ( enabled === "disabled" ) {
			window.addEventListener( "click", cb );
		}
		if ( e.target !== document.querySelector( ".ap-nostyle-icon-clear" ) ) {
			document.querySelector( ".ap-nostyle-input" ).focus();
		}
		setEnabled( "enabled" );

		function cb ( e ) {
			if ( !document.querySelector( ".search-button" ).contains( e.target ) && window.innerWidth > 1024 ) {
				setEnabled( "disabled" );
				window.removeEventListener( "click", cb )
			}
		}
	}

	const toggleShare = ( e ) => {
		const floatPane = document.querySelector( ".show-float" ) || document.querySelector( ".hide-float" );
		if ( floatPane.contains( e.target ) ) {
			return;
		}
		if ( showShare === "hide-float" ) {
			window.addEventListener( "click", cb )
		}
		else {
			window.removeEventListener( "click", cb )
		}
		setShowShare( showShare === "hide-float" ? "show-float" : "hide-float" );

		function cb ( e ) {
			const btn = document.querySelector( ".share-button" );

			if ( btn && !btn.contains( e.target ) ) {
				window.removeEventListener( "click", cb )
				setShowShare( "hide-float" );
			}
		}
	}

	return (
		<NavbarStyled className="navbar">
			<span className="logo">AccuWeather</span>

			{ ( window.innerWidth <= 1024 ) && <Burger className={ menu } onClick={ toggleMenu } /> }

			<NavLinks className={ "navlinks " + ( menu ? "navlinks-enabled" : "navlinks-disabled" ) }>
				<li >
					{ window.innerWidth > 1024 ?
						(
							<button className="navlink search-button" onClick={ enableSearch }>
								<SearchField className={ "searchField searchField-desktop " + enabled } handleSearch={ handleSearch } />
								<span>Search</span>
							</button>
						) : (
							<button className="navlink search-button" onClick={ enableSearch }>
								<span>
									<SearchField className={ "searchField searchField-phone " + enabled } handleSearch={ handleSearch } />
								</span>
							</button>
						)
					}
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
					<button
						className={ "navlink " + ( window.innerWidth > 1024 && "share-button" ) }
						onClick={ toggleShare }
					>
						<ShareIcon height={ iconSize } width={ iconSize } />
						<span>Share</span>
						<FloatShare className={ showShare } />
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
	.navlinks, 
	.burger-menu {
		margin-right: calc(20px + 5%);
	}

	@media (max-width: 1024px) {
		background: ${global.bckClr.light };

		.navlinks {
			margin-right: 0;
		}
	}
`

const NavLinks = styled.ul`
	list-style: none;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
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

		& span:first-of-type {
			margin: 0 0.4rem;
			pointer-events: none;
		}

		svg {
			pointer-events: none;
		}
		.clear-icon,
		.search-icon {
			transform: translateX(-5px);
			pointer-events: initial;
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

	.searchField-desktop {
		position: absolute;
		left: 0;
		transform-origin: left;
		transform: scale(0.8) translateX(calc( -100% + 1.7rem));
		transition: transform 500ms 100ms;
		pointer-events: none;

		@media (max-width: 1024px){
			display: inline-block;
		}

		.algolia-places-nostyle {
			transform-origin: right;
			transition: transform 500ms 100ms;
			margin: 0;

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
			font-family: inherit;
			font-weight: bold;
		}
		.ap-nostyle-input:focus {
			background: none;
		}
	}
	.search-button:focus-within { 
		.searchField-desktop {
			transform: scale(0.8) translateX(calc( -105% + 1.7rem));
			pointer-events: initial;
		}
		
		.searchField-desktop .ap-nostyle-input {
			opacity: 1;
		}

		.searchField-desktop .algolia-places-nostyle::before {
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

	@media (max-width:1024px) {
		position: absolute;
		bottom: 0;
		right: 0;
		flex-direction: column;
		background: ${global.bckClr.light };
		height: calc(100% - ${global.navbar_height });
		margin-top: 50px;
		justify-content: flex-start;
		align-items: flex-end;
		z-index: 501;
		transition: transform 500ms;

		&.navlinks-disabled {
			transform: translateX(100%);
		}

		.navlink {
			margin: 10px 0;
			flex-direction: row-reverse;

			&:not(.search-button) {
				margin-right: 2rem;
			}
		}

		.search-button {
			transform: scale(0.8);
			padding: 0;
		}

		.burger {
			
		}
	}
`