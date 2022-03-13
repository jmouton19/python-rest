import React, { useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function ToggleButtons({ onChange, sx }) {
	const [method, setMethod] = React.useState("date");
	const [descending, setDescending] = React.useState(true);

	useEffect(() => {
		if (onChange) onChange(method, descending);
	}, [method, descending]);

	const hangleChange = (event, newSortMethod) => {
		if (newSortMethod) {
			setMethod(newSortMethod);
		} else {
			setDescending(!descending);
		}
	};

	return (
		<ToggleButtonGroup sx={sx} value={method} exclusive onChange={hangleChange}>
			<ToggleButton value="date">
				<CalendarTodayIcon />
				{method === "date" ? (
					descending ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowDropUpIcon />
					)
				) : null}
			</ToggleButton>
			<ToggleButton value="value">
				<AttachMoneyIcon />
				{method === "value" ? (
					descending ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowDropUpIcon />
					)
				) : null}
			</ToggleButton>
			<ToggleButton value="duration">
				<TimelapseIcon />
				{method === "duration" ? (
					descending ? (
						<ArrowDropDownIcon />
					) : (
						<ArrowDropUpIcon />
					)
				) : null}
			</ToggleButton>
		</ToggleButtonGroup>
	);
}
