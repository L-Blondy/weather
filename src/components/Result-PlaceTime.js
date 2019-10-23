import React from 'react';
import { ReactComponent as LoadingLine } from "../assets/loading-line.svg";
import styled from 'styled-components';
import ThemeContext from "../ThemeContext";

export default function PlaceTime ( { place, localTime, className } ) {
	const theme = React.useContext( ThemeContext )

	const getTime = () => {
		const hour = localTime.hours < 10 ? "0" + localTime.hours : localTime.hours;
		const minutes = localTime.minutes < 10 ? "0" + localTime.minutes : localTime.minutes;
		return hour + ":" + minutes
	}

	return (
		<PlaceTimeStyled className={ className } theme={ theme } >
			{ localTime ?
				( <>
					<p className="place">{ place }</p>
					<p className="time">{ getTime() }</p>
				</>
				) : ( <>
					<LoadingLine />
					<p className="place inactive">s</p>
					<p className="time inactive">s</p>
				</>
				) }
		</PlaceTimeStyled>
	)
}

const PlaceTimeStyled = styled.section`
	position: relative;
	text-align: center;
	font-weight: normal;
	font-family: ${ props => props.theme.fontFam.secondary };
	z-index: -1;

	.loading-img {
		height: 40px;
	}

	.place {
		font-size: 2rem;
		user-select: none;
	}
	.time {
		font-size: 3rem;
		user-select: none;
	}
	.inactive{
		opacity: 0;
	}
`