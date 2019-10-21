import React from 'react';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { SearchField, Title } from "./";
import { pokeRight, fadeIn } from "../styles/keyframes";
import { ReactComponent as Right } from "../assets/chevron-right.svg"

export default function Home ( { handleSearch } ) {

	const [ startNow, setStartNow ] = React.useState( false );

	const handleStartNow = () => {
		setStartNow( true )
	}

	return (
		<HomeStyled startNowDuration={ 1000 } className="home">

			<div className={ "side left-side " + ( startNow ? "fadeout " : "fadein" ) }>
				<Title></Title>

				<div className="moto">
					Check the weather anywhere in just one click
				</div>

				<div className="description">
					An innovative easy to use and customizable app
					<br /> Check the weather in your favorite places
				</div>

				<button className="start-btn" onClick={ handleStartNow }>
					<span>Start now</span>
					<svg className="chevron-right" width="1rem" viewBox="0 0 18 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.888 10.0248L4.16584 0.562922C3.55226 0.106582 2.5575 0.106582 1.94399 0.562922L0.460166 1.6665C-0.152362 2.12206 -0.15354 2.86039 0.457548 3.31702L10.5401 10.8511L0.457548 18.3851C-0.15354 18.8417 -0.152362 19.5801 0.460166 20.0356L1.94399 21.1392C2.55757 21.5955 3.55233 21.5955 4.16584 21.1392L16.8879 11.6773C17.5015 11.221 17.5015 10.4812 16.888 10.0248Z" fill="currentColor" />
					</svg>
				</button>
			</div>

			<div className={ "side right-side " + ( startNow && "full-width " ) }>
				{ startNow && (
					<button className="startnow__close" onClick={ () => setStartNow( false ) }>
						<Right />
					</button>
				) }
				<div className="wrapper-right">
					<SearchField
						className="search-field"
						handleSearch={ handleSearch }
						animated />
				</div>
			</div>
		</HomeStyled>
	)
}

const HomeStyled = styled.div`
	flex-grow: 1;
	position: relative;
	font-family: ${global.fontFamily.primary };
	color: ${global.fontColor.dark };
	letter-spacing: 1px;

	.side {
		position: absolute;
		top: 0;
		width: 45%;
		height: 100%;

		&.left-side{
			display: flex;
			flex-direction: column;
			justify-content: center;
			left: 0;
			align-items: flex-end;
			text-align: right;

			.moto {
				font-size: 1.2rem;
				margin: 2rem 0 1.5rem 0;
			}
			.description {
				line-height: 2.2rem;
			}
			.start-btn {
				margin-top: 2rem;
				font-family: ${global.fontFamily.primary };
				font-size: 1.2rem;
				letter-spacing: 1px;
				color: white;
				border: none;
				background: ${global.btnClr.primary };
				padding: 0.5rem 1.3rem;
				border-radius: 7px;
				transition: background 200ms 40ms;
				outline:none;

				span {
					padding-right: 0.7rem;
				}
				svg {
					position: relative;
					top: 0.2rem;
				}
				&:hover,
				&:focus {
					background: ${global.btnClr.secondary };

					svg {
						animation: ${pokeRight } 200ms alternate infinite 100ms;
					}
				}
			}
		}
		&.fadeout {
			opacity: 0;
			transition-property: opacity;
			transition-duration: ${props => props.startNowDuration / 2 + "ms " };
			
		}
		&.fadein {
			opacity: 1;
			transition-property: opacity;
			transition-duration: ${props => props.startNowDuration + "ms " };
			transition-delay: 500ms;
		}
		&.right-side {
			right: 0;
			transition-property: transform, width;
			transition-duration: ${props => props.startNowDuration + "ms" };

			.startnow__close {
				position: absolute;
				opacity: 0;
				z-index: 1;
				animation: ${fadeIn( 1 ) } 2000ms forwards 1000ms;
				border: none;
				background: none;
				top: 30px;
				left: 30px;
				color: inherit;
				padding: 1rem;

				&:hover {
					color: ${global.btnClr.secondary };
				}
			}
			.wrapper-right {
				position: relative;
				height: 100%;
				width: 100%;

				.search-field {
					position: absolute;
					top: 50%;
					left: 0;
					transform: translate(0, -50%);
					transition-property: transform, left;
					transition-duration: ${props => props.startNowDuration + "ms" };
				}
			}
		}
		&.right-side.full-width {
			width: 100%;
			
			.search-field{
				left: 50%;
				transform: translate(-50%, -50%) scale(1.1);
			}
		}
	}
`

