import React, { useState, useRef } from "react";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import { Avatar, Dialog, Slider, DialogTitle } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

// Todo: Get From Server
const languageList = [
	"Python",
	"JavaScript",
	"Java",
	"C#",
	"C",
	"C++",
	"Go",
	"R",
	"Swift",
	"PHP" 
];

// Todo: Site source material ui website?
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.05),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.black, 0.1),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

// Todo: Site source material ui website?
const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

// Todo: Site source material ui website?
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

function LanguagesPicker() {
	const [searchValue, setSearchValue] = useState("");
	const [selectedLanguages, setSelectedLanguages] = useState({});
	const [currentLanguage, setCurrentLanguage] = useState("");
	const [currentExperience, setCurrentExperience] = React.useState(0);
	const [editExperience, setEditExperience] = useState(false);
	const searchBarRef = useRef();

	const addNewLanguage = (language) => {
		let newLanguage = {};
		newLanguage[language] = 1;
		setSelectedLanguages(selectedLanguages =>({
			...selectedLanguages,
			...newLanguage
		}));
	};
	
	const removeLanguage = (language) => {
		setSelectedLanguages(selectedLanguages => {
			const newLanguageSet = {...selectedLanguages};
			delete newLanguageSet[language];
			return newLanguageSet;
		});
	};

	const getExperience = (language) => {
		return selectedLanguages[language];
	};

	const updateLanguage = (language, experience) => {
		const updatedLanguage = {[language]: experience};
		setSelectedLanguages({
			...selectedLanguages,
			...updatedLanguage
		});
	};

	const handleExperienceChange = (event, value) => {
		setCurrentExperience(value);
	};

	const unselectedLanguages = languageList.filter(
		(language) => !Object.keys(selectedLanguages).includes(language)
	);

	const filteredLanguages = unselectedLanguages.filter(
		(value) => value.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
	);

	return (
		<>
			<Stack direction="column" spacing={1} marginBottom={2}>
				<InputLabel> Add your programming languages</InputLabel>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						inputRef={searchBarRef}
					/>
				</Search>
				{searchValue !== "" ? (
					<Paper sx={{ backgroundColor: "#eeeeee", borderRadius: 1 }}>
						<Typography variant="caption" marginTop={1} marginLeft={1}>
							{filteredLanguages.length == 0
								? "No Search Results."
								: "Results:"}
						</Typography>
						<br />
						{filteredLanguages.map((language) => (
							<Chip
								sx={{
									marginTop: 0.5,
									marginBottom: 0.5,
									marginLeft: 0.5,
									marginRight: 0.5,
								}}
								icon={<AddIcon />}
								key={language}
								label={language}
								clickable
								onClick={() => {
									addNewLanguage(language);
									searchBarRef.current.focus();
								}}
							/>
						))}
					</Paper>
				) : null}
				{selectedLanguages.length !== 0 ? (
					<Paper>
						<Typography variant="caption" marginTop={1} marginLeft={1}>
							Selected Languages:
						</Typography>
						<br />
						{Object.keys(selectedLanguages).map((language) => (
							<Chip
								avatar={<Avatar>{getExperience(language)}</Avatar>}
								sx={{
									marginTop: 0.5,
									marginBottom: 0.5,
									marginLeft: 0.5,
									marginRight: 0.5,
								}}
								key={language}
								label={language}
								onDelete={() => {
									removeLanguage(language);
								}}
								onClick={() => {
									setCurrentLanguage(language);
									setCurrentExperience(selectedLanguages[language]);
									setEditExperience(true);
								}}
								color="success"
							/>
						))}
					</Paper>
				) : null}
			</Stack>
			<Dialog 
				open={editExperience} 
				onClose={() => {
					updateLanguage(currentLanguage, currentExperience);
					setEditExperience(false);
				}}
			>
				<DialogTitle>
					<Typography>
						Experience in Months
					</Typography>
					<Slider
						value={currentExperience}
						min={1}
						max={120}
						step={1}
						onChange={handleExperienceChange}
						valueLabelDisplay="on"
					/>
				</DialogTitle>
			</Dialog>
		</>
	);
}

export default LanguagesPicker;
