import React from 'react';
import styled from "styled-components";
import { global } from "../styles/globalStyles";

export default function Footer () {
	return (
		<FooterStyled>
			Powered by WeatherBit, 7Timer and Algolia.
		</FooterStyled>
	)
}

const FooterStyled = styled.div`
	font-family: ${global.fontFamily.secondary };
	height: ${global.navbar_height };
	display: flex;
	align-items: center;
	justify-content: center;
	font-style: italic;
	font-size: 0.7rem;
`