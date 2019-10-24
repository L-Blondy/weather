import React from 'react';
import styled from "styled-components";
import ThemeContext from "../ThemeContext";

export default function Footer () {
	const theme = React.useContext( ThemeContext )

	return (
		<FooterStyled theme={ theme } >
			Powered by WeatherBit, 7Timer and Algolia.
		</FooterStyled>
	)
}

const FooterStyled = styled.div`
	font-family: ${props => props.theme.fontFam.secondary };
	color: ${props => props.theme.fontClr.primary };
	height: ${props => props.theme.navbar_height };
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: italic;
	font-size: 0.7rem;
	flex-shrink: 0;
`