import React from 'react';
import { Line, Area, XAxis, YAxis, ResponsiveContainer, LabelList, ComposedChart, Bar, Tooltip } from 'recharts';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { Icon } from "./";

export default function Graph ( { hourlyData, activeDay, graphType } ) {

	if ( activeDay <= 7 ) {
		const offset = 25 - hourlyData[ activeDay ][ 0 ].temp2m
		hourlyData[ activeDay ].map( hourData => hourData.tempOffset = hourData.temp2m + offset )
	}

	return activeDay > 7 ?
		(
			<GraphStyled fontSize="1.5rem">Hourly weather is available for the next 7 days only</GraphStyled>
		) : (
			<GraphStyled className="graph-container">
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
							stroke={ global.fontColor.dark }
							strokeWidth="1.5"
							fill="url(#areaGrad)"
							fillOpacity={ 1 }
							animationDuration={ 500 }
						>
							<LabelList
								dataKey="temp2m"
								position="top"
								fill={ global.fontColor.dark }
								formatter={ ( val ) => val + "°" }
								offset={ 10 }
							/>
						</Area>

						<XAxis
							xAxisId={ 0 }
							dataKey="hour_english"
							scale="point"
							tickLine={ false }
							stroke={ global.fontColor.dark }
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

					</ComposedChart >
				</ResponsiveContainer >
			</GraphStyled >
		)
}

const GraphStyled = styled.div`
	height: ${global.chartHeight };
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${global.fontFamily.primary };
	font-size: ${props => props.fontSize ? props.fontSize : "1rem" };
	color: ${global.fontColor.dark };
	padding: 0 2rem;

	@media (max-width: 600px) {
		padding-left: 0;
	}

	.recharts-layer .loading-img {
		animation: fadeIn 500ms forwards;
		color: ${global.fontColor.dark };

		@keyframes fadeIn {
			from { opacity: 0 }
			to { opacity: 1 }
		}
	}
`