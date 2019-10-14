import React from 'react';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { NavLink } from "react-router-dom";
import { SearchField, Share } from ".";

function Navbar ( { handleSearch } ) {
	return (
		<NavbarStyled className="navbar">

			<span className="logo">AccuWeather</span>

			<ul className="navlinks">
				<SearchField handleSearch={ handleSearch } />
				<li><NavLink className=" navlink home" to="/" >Home</NavLink></li>
				<li><NavLink className="navlink  settings" to="/Settings">Settings</NavLink></li>
				<Share />
			</ul>

		</NavbarStyled>
	)
}

const NavbarStyled = styled.div`
	color: ${global.fontColor.primary };
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50px;
	box-shadow: 0 0 20px 0 #26374f20;
	flex-shrink: 0;

	ul {
		list-style: none;
	}

	.logo {
		font-family: Quantico;
		font-style: italic;
		font-size: 1.8rem;
		margin-left: calc(20px + 5%);
		user-select: none;
		color: inherit;
	}
	.navlinks {
		width: 60%;
		height: 100%;
		margin-right: calc(20px + 2%);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		list-style: none;

		.navlink {
			position: relative;
			cursor: pointer;
			padding: 5px 20px;
			display: flex;
			text-decoration: none;
			color: inherit;
			height: 100%;
			justify-content: center;
			align-items: center;
			user-select: none;
			margin: 1.5vw;
			font-family: ${global.fontFamily.primary };
			font-size: 1.1rem;		
			letter-spacing: 2px;

			@media (max-width:1024px) {
				margin: 0vw;
				font-size: 1rem;		
			}

			&:not(.share)::before{
				position: absolute;
				content: "";
				height: 1px;
				width: 70%;
				background: currentColor;
				bottom: 0;
				transform: scaleX(0);
				transition: transform 200ms 40ms;
			}
			&:hover::before {
				transform: scaleX(1);
			}
			&.share {
				color: ${global.fontColor.secondary };
				background: ${global.btnClr.primary };
				border-radius: 7px;
				border: none;
				transition: background 250ms 40ms;
			}
			&.share:hover {
				background:${global.btnClr.secondary };
			}
		}
		.share-link {
			position: relative;

			.share + .float {
				display: none;
				background: #00000020;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, calc(100% + 1rem));

				&::before, &::after {
					position: absolute;
					content: "";
					top: 0;
					left: 50%;
					transform: translate(-50%, -100%);
					border-left: 1rem solid transparent;
					border-right: 1rem solid transparent;
					border-bottom: 1rem solid #c0c4c5;
				}
			}
			.active + .float {
				display: initial;
			}
		}
		.ap-nostyle-input,
		.ap-nostyle-dropdown-menu {
			max-width: 300px;
		}
		.ap-nostyle-input:focus{
			background: linear-gradient(#bfc1c3, #f2f6f9)
		}
		.ap-nostyle-dropdown-menu {
			background: #f2f6f9;
		}

		.search-field {
			transform: scale(0.8);
		}

		@media (max-width: 1024px) {
			.search-field {
				display: inline-block;
			}
		}	
	}
`
export default Navbar;