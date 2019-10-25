import React from 'react';
import sky from "./assets/background/sky.jpg";
import landscape from "./assets/background/landscape.jpg";
import deepWater from "./assets/background/deep-water.jpg";
import blue from "./assets/background/blue.jpg";

const ThemeContext = React.createContext( null );
export default ThemeContext;

export const theme = [
	{
		fontFam: {
			primary: "Roboto",
			secondary: "raleway",
		},
		fontClr: {
			primary: "#eaeaea",
			secondary: "#eaeaea",
			hover: "#ff0066",
			disabled: "#dddddd50",
		},
		btnClr: {
			primary: "#00ad9d",
			secondary: "#008dad",
		},
		bkgClr: {
			primary: "#0b1e33",
			secondary: "#485361",
		},
		icons: {
			st0: "#ffa900",
			st1: "#ccc",
			st2: "#eee",
			st3: "#00aebd",
		},
		bkgIMG: {
			url: blue,
			opacity: "1",
			filter: "brightness(40%) contrast(120%)",
			position: "center",
		},
		hourlyBtnClr: "#b1b1b140",
		activeBtn: "#b1b1b140",
		windClr: "#afb3b5",

		chartHeight: "12rem",
		navbar_height: "50px",
	},

	{
		fontFam: {
			primary: "Roboto",
			secondary: "raleway",
		},
		fontClr: {
			primary: "#4f545d",
			secondary: "#eaeaea",
			hover: "#ff0066",
			disabled: "#dadada",
		},
		btnClr: {
			primary: "#ffa013",
			secondary: "#ff0066",
		},
		bkgClr: {
			primary: "#3f4958",
			secondary: "#cfd7da",
		},
		icons: {
			st0: "#ff9000",
			st1: "#5b7388",
			st2: "#888a8c",
			st3: "#00aebd",
		},
		bkgIMG: {
			url: sky,
			opacity: "0.35",
			filter: "grayscale(0)",
			position: "right top",
		},
		hourlyBtnClr: "#ffffffcc",
		activeBtn: "#ffffffaa",
		windClr: "#5d6467",
		chartHeight: "12rem",
		navbar_height: "50px",
	},

	{
		fontFam: {
			primary: "Roboto",
			secondary: "raleway",
		},
		fontClr: {
			primary: "#eaeaea",
			secondary: "#eaeaea",
			hover: "#ff0066",
			disabled: "#dddddd50",
		},
		btnClr: {
			primary: "#00ad9d",
			secondary: "#008dad",
		},
		bkgClr: {
			primary: "#0b1b1b",
			secondary: "#496666",
		},
		icons: {
			st0: "#ffa900",
			st1: "#ccc",
			st2: "#eee",
			st3: "#00aebd",
		},
		bkgIMG: {
			url: deepWater,
			opacity: "1",
			filter: "",
			position: "center",
		},
		hourlyBtnClr: "#b1b1b140",
		activeBtn: "#b1b1b140",
		windClr: "#afb3b5",

		chartHeight: "12rem",
		navbar_height: "50px",
	},

	{
		fontFam: {
			primary: "Roboto",
			secondary: "raleway",
		},
		fontClr: {
			primary: "#3a3e44",
			secondary: "#e8e6e1",
			hover: "#ff0066",
			disabled: "#dadada",
		},
		btnClr: {
			primary: "#ffa013",
			secondary: "#ff0066",
		},
		bkgClr: {
			primary: "#3f4958",
			secondary: "#e6e4df",
		},
		icons: {
			st0: "#ff9000",
			st1: "#5b7388",
			st2: "#545454",
			st3: "#00aebd",
		},
		bkgIMG: {
			url: landscape,
			opacity: "0.6",
			filter: "sepia(100%)",
			position: "center",
		},
		hourlyBtnClr: "#ffffffcc",
		activeBtn: "#ffffffaa",
		windClr: "#333638",
		chartHeight: "12rem",
		navbar_height: "50px",
	},
]