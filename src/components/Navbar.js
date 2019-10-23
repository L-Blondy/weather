import React from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { SearchField, FloatShare, Burger } from "./";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import ThemeContext from "../ThemeContext";

export default function Navbar ( { handleSearch, searchCount, switchTheme } ) {

	const [ showShare, setShowShare ] = React.useState( "hide-float" );
	const [ isSearchEnabled, toggleSearch ] = React.useState( "disabled" );
	const [ isMenuOpened, toggleMenu ] = React.useState( false );
	const [ prevSearchCount, setSearchCount ] = React.useState( 0 );
	const navbar = React.useRef();
	const theme = React.useContext( ThemeContext )

	React.useEffect( () => {
		if ( prevSearchCount !== searchCount ) {
			toggleMenu( false )
		}
		setSearchCount( searchCount )
	}, [ searchCount, prevSearchCount ] )

	const handleClickBurgerOut = () => {
		function cb ( e ) {
			if ( !navbar.current.contains( e.target ) ) {
				toggleMenu( false )
				window.removeEventListener( "click", cb )
			}
		}
		toggleMenu( !isMenuOpened )

		if ( !isMenuOpened ) {
			window.addEventListener( "click", cb )
		}
		if ( isMenuOpened ) {
			window.removeEventListener( "click", cb )
		}

	}

	const enableSearch = ( e ) => {
		if ( isSearchEnabled === "disabled" ) {
			window.addEventListener( "click", cb );
		}
		if ( e.target !== document.querySelector( ".ap-nostyle-icon-clear" ) ) {
			document.querySelector( ".ap-nostyle-input" ).focus();
		}
		toggleSearch( "enabled" );

		function cb ( e ) {
			if ( !document.querySelector( ".search-button" ).contains( e.target ) && window.innerWidth > 1024 ) {
				toggleSearch( "disabled" );
				window.removeEventListener( "click", cb )
			}
		}
	}

	const toggleShare = ( e ) => {
		console.log( "toggle share event" )
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
			const btn = document.querySelector( ".share-button" ) || document.querySelector( ".share-button-phone" );
			console.log( btn )

			if ( btn && !btn.contains( e.target ) ) {
				window.removeEventListener( "click", cb )
				setShowShare( "hide-float" );
			}
		}
	}

	return (
		<NavbarStyled className="navbar" ref={ navbar } theme={ theme } >
			<span className="logo">AccuWeather</span>

			{ ( window.innerWidth <= 1024 ) && (
				<Burger className={ "burger-menu " + isMenuOpened } onClick={ handleClickBurgerOut } />
			) }

			<NavLinks className={ "navlinks " + ( isMenuOpened ? "navlinks-enabled" : "navlinks-disabled" ) } theme={ theme }>
				<li >
					{ window.innerWidth > 1024 ?
						(
							<button className="navlink search-button" onClick={ enableSearch }>
								<SearchField
									className={ "searchField searchField-desktop " + isSearchEnabled }
									handleSearch={ handleSearch }
								/>
								<span className="name" >Search</span>
							</button>
						) : (
							<button className="navlink search-button" onClick={ enableSearch }>
								<span>
									<SearchField
										className={ "searchField searchField-phone " + isSearchEnabled }
										handleSearch={ handleSearch }
									/>
								</span>
							</button>
						)
					}
				</li>

				<li>
					<NavLink className="navlink" to="/" onClick={ () => toggleMenu( false ) } >
						<HomeIcon height={ iconSize } width={ iconSize } />
						<span className="name" >Home</span>
					</NavLink>
				</li>

				<li>
					<button className="navlink" onClick={ switchTheme }>
						<HomeIcon height={ iconSize } width={ iconSize } />
						<span className="name" >Theme</span>
					</button>
				</li>

				<li>
					<button
						className={ "navlink " + ( window.innerWidth > 1024 ? "share-button" : "share-button-phone" ) }
						onClick={ toggleShare }
					>
						<ShareIcon height={ iconSize } width={ iconSize } />
						<span className="name" >Share</span>
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
	color: ${props => props.theme.fontClr.primary };
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${props => props.theme.navbar_height };
	box-shadow: 0 0 50px 0 #26374f15;
	flex-shrink: 0;

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
		background: ${props => props.theme.bkgClr.primary };
		color: ${props => props.theme.fontClr.secondary };

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
		font-family: ${props => props.theme.fontFam.secondary };
		font-size: 1rem;
		font-weight: bold;
		letter-spacing: 0.7px;
		padding : 0.4rem 1rem;
		display: flex;
		align-items: center;
		cursor: pointer;
		background: none;

		&:focus, 
		&:hover:not(:focus-within):not(.share-button) ,
		&:hover:not(:focus-within) .search-icon {
			outline: none;
			color: ${props => props.theme.btnClr.primary };
			transition: color 200ms;
		}

		& .name {
			margin: 0 0.4rem;
			pointer-events: none;
		}

		svg {
			pointer-events: none;
		}
		.clear-icon,
		.search-icon {
			pointer-events: initial;
		}

		&.share-button {
			color: white;
			background: ${props => props.theme.btnClr.primary };
			border-radius: 7px;
			transition: background 250ms 40ms;

			&:hover {
				background: ${props => props.theme.btnClr.secondary };
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

	.search-button { 
		z-index: 2;

		.ap-nostyle-dropdown-menu {
			pointer-events: auto;

			.ap-nostyle-suggestion {
				pointer-events: auto;
			}
		}
	}

	@media (max-width:1024px) {
		position: absolute;
		bottom: 0;
		right: 0;
		flex-direction: column;
		background: ${props => props.theme.bkgClr.primary };
		height: calc(100vh - 50px);
		margin-top: 50px;
		justify-content: flex-start;
		align-items: flex-end;
		z-index: 1;
		transition: transform 500ms;
		color: ${props => props.theme.fontClr.secondary };

		.burger-menu {
			color: currentColor;
		}

		&.navlinks-disabled {
			transform: translateX(100%);
		}

		.navlink {
			flex-direction: row-reverse;
			font-size: 1.2rem;
			padding: 0.5rem 0;
		}

		.search-button {
			padding: 0;
			cursor: text;
			color: ${props => props.theme.fontClr.secondary };

			.ap-nostyle-dropdown-menu {
				pointer-events: auto;
				background:  ${props => props.theme.bkgClr.secondary };
				box-shadow: 0 0 5px 0 #00000020;
				color: ${props => props.theme.fontClr.primary };
				font-size: 1rem;
			}
		}

		.navlink {
			margin: 0.5rem calc(20px + 5vw);
		}
		.search-button {
			margin: 1rem calc(20px + 5vw);
		}
		.share-button-phone .hide-float,
		.share-button-phone .show-float {
			transform-origin: top right;
		}
	}
	@media (max-width: 480px) {
		.navlink {
			font-size: 1.5rem;
		}
	}
`