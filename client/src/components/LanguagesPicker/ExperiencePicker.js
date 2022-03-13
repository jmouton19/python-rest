import React, { useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const labels = {
	0: "< 1 Year",
	0.5: "1 Year",
	1: "2 Years",
	1.5: "3 Years",
	2: "4 Years",
	2.5: "5 Years",
	3: "6 Years",
	3.5: "7 Years",
	4: "8 Years",
	4.5: "9 Years",
	5: "10+ Years",
};

const StyledRating = styled(Rating)(({ theme }) => ({
	"& .MuiRating-iconFilled": {
		color: theme.palette.primary.main,
	},
	"& .MuiRating-iconHover": {
		color: alpha(theme.palette.primary.main, 0.5),
	},
	"& .MuiRating-iconEmpty": {
		color: "divider",
	},
}));

function ExperiencePicker({
	language,
	updateLanguage,
	presetValue,
	readOnly,
	width,
}) {
	const [value, setValue] = React.useState(0);
	const [hover, setHover] = React.useState(-1);

	useEffect(() => {
		if (presetValue) {
			setValue(presetValue / 2);
		}
	}, []);

	return (
		<Stack direction="row" width={width}>
			<StyledRating
				readOnly={readOnly}
				value={value}
				precision={0.5}
				onChange={(event, newValue) => {
					setValue(newValue);
					updateLanguage(language, newValue * 2);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				icon={<WorkIcon fontSize="inherit" />}
				emptyIcon={<WorkOutlineIcon fontSize="inherit" />}
				max={5}
			/>
			<Typography variant="caption">
				{value !== null && (
					<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
				)}
			</Typography>
		</Stack>
	);
}
export default ExperiencePicker;
