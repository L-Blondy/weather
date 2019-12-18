import React from 'react';
import styled from 'styled-components';
import ThemeContext from "../ThemeContext";

export default function Burger ( { onClick, className } ) {
	const theme = React.useContext( ThemeContext )

	return (
		<BurgerStyled className={ className } onClick={ onClick } theme={ theme } >
			<div className="line line1"></div>
			<div className="line line2"></div>
			<div className="line line3"></div>
		</BurgerStyled>
	)
}

const BurgerStyled = styled.button`
	position: relative;
	height: 28px;
	width: 35px;
	border: none;
	background: none;
	color: currentColor;
	cursor: pointer;
	transition: color 200ms;

	&:hover {
		color: ${props => props.theme.btnClr.primary };
	}
	
	.line {
		left: 0;
		position: absolute;
		height: 4px;
		width: 100%;
		color: inherit;
		background: currentColor;
		border-radius: 5px;
	}
	.line1 {
		top: 0;
		transition: transform 300ms, top 300ms;
	}
	.line2 {
		top: 50%;
		transform: translateY(-50%);
		transition: opacity 300ms;
	}
	.line3 {
		top: 100%;
		transition: transform 300ms, top 300ms;
		transform: translateY(-100%);
	}
	&.true {
		.line1 {
			top: 50%;
			transform: translateY(-50%) rotate(45deg);
		}
		.line2{
			opacity: 0;
		}
		.line3 {
			top: 50%;
			transform: translateY(-50%) rotate(-45deg);
		}
	}
`