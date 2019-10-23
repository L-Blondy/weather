import React from 'react';
import { Line, Area, XAxis, YAxis, ResponsiveContainer, LabelList, ComposedChart, Bar, Tooltip } from 'recharts';
import styled from "styled-components";
import ThemeContext from "../ThemeContext";
import { ReactComponent as LoadingLine } from "../assets/loading-line.svg"
import { Icon } from ".";

export default function Graph ( props ) {
	const theme = React.useContext( ThemeContext );

	return !props.hourlyData ?
		(
			<GraphStyled className={ props.className } theme={ theme }>
				<LoadingLine />
			</GraphStyled>
		) : props.activeDay > 7 ?
			(
				<GraphStyled fontSize="1.3rem" theme={ theme } >Hourly weather is available for the next 7 days only</GraphStyled>
			) : (
				<GraphLoaded { ...props } />
			)
}

function GraphLoaded ( { hourlyData, activeDay, graphType } ) {

	const theme = React.useContext( ThemeContext )
	const offset = 25 - hourlyData[ activeDay ][ 0 ].temp2m
	hourlyData[ activeDay ].map( hourData => hourData.tempOffset = hourData.temp2m + offset )

	return (
		<GraphStyled className="graph-container" theme={ theme } >
			<ResponsiveContainer width="100%" height="100%" >
				<ComposedChart data={ hourlyData[ activeDay ] } margin={ { top: 25, bottom: 0, left: 20, right: 20 } } >

					<defs>
						<linearGradient id="areaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="rgba(255,255,255, 0.50)" />
							<stop offset="100%" stopColor="#A1C7D250" />
						</linearGradient>
					</defs>

					<YAxis yAxisId="temp" dataKey="tempOffset" hide={ true } />

					<Area
						yAxisId="temp"
						type="monotone"
						dataKey="tempOffset"
						stroke={ theme.fontClr.primary }
						strokeWidth="1.5"
						fill="url(#areaGrad)"
						fillOpacity={ 1 }
						animationDuration={ 500 }
					>
						<LabelList
							dataKey="temp2m"
							position="top"
							fill={ theme.fontClr.primary }
							formatter={ ( val ) => val + "°" }
							offset={ 10 }
						/>
					</Area>

					<XAxis
						xAxisId={ 0 }
						dataKey="hour_english"
						scale="point"
						tickLine={ false }
						stroke={ theme.fontClr.primary }
						strokeOpacity={ 1 }
						interval={ "preserveStartEnd" }
						minTickGap={ 5 }
					/>

					<Line
						hide={ graphType !== "classic" }
						yAxisId="temp"
						dataKey={ () => 10 }
						dot={ <Icon /> }
						animationDuration={ 500 }
						stroke="none"
					/>

					<YAxis
						yAxisId="precip"
						dataKey="prec_amount"
						hide={ true }
						domain={ [ 0, 'dataMax + 10' ] } />

					<Bar
						hide={ graphType !== "precip" }
						yAxisId="precip"
						dataKey="prec_amount"
						barSize={ 7 }
						fill="#265E92aa"
						minPointSize={ 3 }
					/>
					{ graphType === "precip" && (
						<Tooltip
							animationDuration={ 200 }
							content={ props => {
								return props.payload[ 1 ] ? <div>{ props.payload[ 1 ].value + "mm/hr" }</div> : <div></div>
							} }
						/>
					) }

				</ComposedChart>
			</ResponsiveContainer>
		</GraphStyled>
	)
}

const GraphStyled = styled.div`
	position: relative;
	height: ${props => props.theme.chartHeight };
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${props => props.theme.fontFam.primary };
	font-size: ${props => props.fontSize ? props.fontSize : "1rem" };
	color: ${props => props.theme.fontClr.primary };
	padding: 0 2rem;

	@media (max-width: 600px) {
		padding: 0;
	}

	.recharts-layer .loading-img {
		animation: fadeIn 500ms forwards;
		color: ${props => props.theme.fontClr.primary };

		@keyframes fadeIn {
			from { opacity: 0 }
			to { opacity: 1 }
		}
	}
`