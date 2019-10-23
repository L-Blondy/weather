import React from 'react';
import styled from 'styled-components';
import ThemeContext from "../ThemeContext";

export default function Section ( { className, title, content, titleContent } ) {
	const theme = React.useContext( ThemeContext )

	return (
		<SectionStyled className={ className } theme={ theme } >
			<div className="section-title-wrapper">
				<h4>{ title }</h4>
				{ titleContent && titleContent }
			</div>
			{ content }
		</SectionStyled>
	)
}

const SectionStyled = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;
	
	.section-title-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 2rem;
		margin-bottom: 0.5rem;

		@media (max-width: 768px) {
			padding-right: 0;
		}

		h4 {
			font-family: ${ props => props.theme.fontFam.secondary };
			font-size: 1.3rem;
			font-weight: bold;
		}
	}
`
