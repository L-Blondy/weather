import React from 'react';
import { ReactComponent as LoadingLine } from "../assets/loading-line.svg";
import styled from 'styled-components';
import { global } from "../styles/globalStyles";

export default function PlaceTime ( { place, localTime, className } ) {

	const getTime = () => {
		const hour = localTime.hours < 10 ? "0" + localTime.hours : localTime.hours;
		const minutes = localTime.minutes < 10 ? "0" + localTime.minutes : localTime.minutes;
		return hour + ":" + minutes
	}

	return (
		<PlaceTimeStyled className={ className }>
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
	font-family: ${ global.fontFamily.secondary };
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