import React from 'react';
import { Line, Area, XAxis, ResponsiveContainer, LabelList, ComposedChart } from 'recharts';
import styled from "styled-components";
import { global } from "../styles/globalStyles";
import { ReactComponent as LoadingGraph } from "../assets/loading-graph.svg"
import { Icon } from "./";

export default function Graph ( { hourlyData, activeDay } ) {
	console.log( hourlyData, activeDay )

	if ( hourlyData ) {
		if ( activeDay <= 7 ) {
			const offset = 30 - hourlyData[ activeDay ][ 0 ].temp2m
			hourlyData[ activeDay ].map( hourData => hourData.tempOffset = hourData.temp2m + offset )
		}
	}

	return !hourlyData ?
		(
			<GraphStyled ><LoadingGraph opacity="0.6" /></GraphStyled>
		) : activeDay > 7 ?
			(
				<GraphStyled >Hourly weather is available for the next 7 days only</GraphStyled>
			) : (
				<GraphStyled className="graph-container">
					<ResponsiveContainer width="100%" height="100%" >
						<ComposedChart data={ hourlyData[ activeDay ] } margin={ { top: 20, bottom: 0, left: 20, right: 20 } } >

							<defs>
								<linearGradient id="areaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="rgba(255,255,255, 0.50)" />
									<stop offset="100%" stopColor="#A1C7D250" />
								</linearGradient>
							</defs>

							<Area
								type="monotone"
								dataKey="tempOffset"
								stroke={ global.fontColor.primary }
								strokeWidth="1.5"
								fill="url(#areaGrad)"
								fillOpacity={ 1 }
								animationDuration={ 500 }
							>
								<LabelList
									dataKey="temp2m"
									position="top"
									fill={ global.fontColor.primary }
									formatter={ ( val ) => val + "°" }
									offset={ 10 }
								/>
							</Area>

							<Line
								dataKey={ () => 10 }
								dot={ <Icon /> }
								animationDuration={ 500 }
								stroke="none"
							>
							</Line>

							<XAxis
								xAxisId={ 0 }
								dataKey="hour_english"
								scale="point"
								tickLine={ false }
								stroke={ global.fontColor.primary }
								strokeOpacity={ 1 }
							/>
						</ComposedChart >
					</ResponsiveContainer >
				</GraphStyled >
			)
}

const GraphStyled = styled.div`
	height: 12rem;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`