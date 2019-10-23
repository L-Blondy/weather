import React from 'react';
const ThemeContext = React.createContext( null );
export default ThemeContext;

export const theme_light = {
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
	chartHeight: "12rem",
	navbar_height: "50px",
}
export const theme_dark = {
	fontFam: {
		primary: "Roboto",
		secondary: "raleway",
	},
	fontClr: {
		primary: "red",
		secondary: "blue",
		hover: "#ff0066",
		disabled: "#dadada",
	},
	btnClr: {
		primary: "yellow",
		secondary: "#ff0066",
	},
	bkgClr: {
		primary: "green",
		secondary: "#cfd7da",
	},
	chartHeight: "12rem",
	navbar_height: "50px",
}