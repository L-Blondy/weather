import React from 'react';
import { Line, Area, XAxis, ResponsiveContainer, LabelList, ComposedChart } from 'recharts';
import styled from "styled-components";
import { Icon } from "./";

export default function Graph ( { hourlyData, activeDay } ) {

	return !hourlyData ?
		(
			<div>Loading...</div>
		) : (
			<GraphStyled className="graph-container">
				<ResponsiveContainer width="100%" height="100%" >
					<ComposedChart data={ hourlyData[ activeDay ] } margin={ { top: 20, bottom: 20, left: 20, right: 20 } } >

						<Area
							type="monotone"
							dataKey="temp2m"
							stroke="steelblue"
							fillOpacity={ 1 }
							fill="lightblue"
							animationDuration={ 500 }
						>
							<LabelList
								dataKey="temp2m"
								position="top"
								fill="steelblue"
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
							dataKey="hour"
							scale="point"
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</GraphStyled >
		)
}

const GraphStyled = styled.div`
	height: 300px;
	width: 100%;
`