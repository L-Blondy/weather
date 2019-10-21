import React from 'react';
import { ReactComponent as Facebook } from "../assets/share/facebook.svg";
import { ReactComponent as Twitter } from "../assets/share/twitter.svg";
import { ReactComponent as Linkedin } from "../assets/share/linkedin.svg";
import styled from "styled-components";
import { global } from "../styles/globalStyles";

export default function FloatShare ( { className } ) {

	const URL_facebook = "https://www.facebook.com/v4.0/dialog/share?app_id=444477226186005&quote=Accuweater%20website&hashtag=%23Accuweather&href=https%3A%2F%2Fwww.google.com&redirect_uri=https%3A%2F%2Fwww.google.com"
	const URL_twitter = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.google.com&text=This%20is%20my%20custom%20text.­%0A&original_referer=https%3A%2F%2Fwww.google.com"
	const URL_linkedin = "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.google.com"

	return (
		<FloarShareStyled
			className={ className }
			links={ 3 }
		>
			<li>
				<a target="_blank" rel="external noreferrer noopener" href={ URL_facebook }>
					<Facebook className="share-link-icon" />Facebook
				</a>
			</li>
			<li>
				<a target="_blank" rel="externa noreferrer noopener" href={ URL_twitter }>
					<Twitter className="share-link-icon" />Twitter
				</a>
			</li>
			<li>
				<a target="_blank" rel="external noreferrer noopener" href={ URL_linkedin }>
					<Linkedin className="share-link-icon" />LinkedIn
				</a>
			</li>
		</FloarShareStyled>
	)
}

const FloarShareStyled = styled.div`
	position: absolute;
	display: grid;
	bottom: 0;
	left: 50%;
	grid-template-rows: repeat( ${ props => props.links }, 1fr);
	background: ${ global.bckClr.dark };
	color: ${ global.fontColor.light };
	row-gap: 1rem;
	padding: 0.7rem;
	border-radius: 5px;
	transform: translate(-50%, calc(100% + 1rem)) scale(0, 0);
	opacity: 0;
	transform-origin: top;
	transition: transform 300ms, opacity 300ms;
	letter-spacing: 0.5px;
	font-size: 0.9rem;
	z-index: 100;

	&.show-float {
		transform: translate(-50%, calc(100% + 1rem)) scale(1, 1);
		opacity: 1;
	}

	&::before { 
		position: absolute;
		content: "";
		top: 0;
		left: 50%;
		transform: translate(-50%, -65%);
		border-left: 1rem solid transparent;
		border-right: 1rem solid transparent;
		border-bottom: 1rem solid ${global.bckClr.dark };
	}

	a {
		text-decoration: none;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: inherit;
		font-family: ${global.fontFamily.primary };
		font-weight: normal;
		height: 100%;
		padding-right: 1.5rem;

		.share-link-icon {
			height: 1.5rem;
			width: 1.5rem;
			margin-right: 0.5rem;
		}

		&:hover,
		&:focus {
			filter: brightness(70%);
		}
	}
`
