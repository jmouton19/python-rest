import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import WorkIcon from "@mui/icons-material/Work";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Stack } from "@mui/material";

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

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#85571e",
	},
	"& .MuiRating-iconHover": {
		color: "green",
	},
});

function ExperiencePicker({ language, updateLanguage, experience }) {
	const [value, setValue] = React.useState(0);
	const [hover, setHover] = React.useState(-1);

	React.useEffect(() => {
		if(experience != null) {
			setValue(experience);
		}
	},[experience]);

	return (
		<Stack direction="row">
			<StyledRating
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
