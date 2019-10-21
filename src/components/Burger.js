import React from 'react';
import styled from 'styled-components';
import { global } from "../styles/globalStyles";

export default function Burger ( { onClick, className } ) {
	return (
		<BurgerStyled className={ "burger-menu " + className } onClick={ onClick } >
			<div className="line line1"></div>
			<div className="line line2"></div>
			<div className="line line3"></div>
		</BurgerStyled>
	)
}

const BurgerStyled = styled.button`
	position: relative;
	height: 30px;
	width: 35px;
	border: none;
	background: none;
	color: ${global.fontColor.primary };
	
	.line {
		left: 0;
		position: absolute;
		height: 4px;
		width: 100%;
		background: ${global.fontColor.dark };
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
		bottom: 0%;
		transition: transform 300ms, bottom 300ms;
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