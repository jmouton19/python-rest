import React, { useState, useRef, useEffect } from "react";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ExperiencePicker from "./ExperiencePicker";
import { useUserCredentials } from "../../AuthProvider";

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
	"PHP",
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

function LanguagesPicker(props) {
	const [searchValue, setSearchValue] = useState("");
	const [selectedLanguages, setSelectedLanguages] = useState({});
	const { existingLanguages } = props;
	const searchBarRef = useRef();
	const user = useUserCredentials();

	useEffect(() => {
		if(existingLanguages){
			setSelectedLanguages({
				...user["programmingLanguages"],
			});
			
		}
	}, [existingLanguages]);

	const addNewLanguage = (language) => {
		let newLanguage = {};
		newLanguage[language] = 0;
		setSelectedLanguages((selectedLanguages) => ({
			...selectedLanguages,
			...newLanguage,
		}));
	};

	const removeLanguage = (language) => {
		setSelectedLanguages((selectedLanguages) => {
			const newLanguageSet = { ...selectedLanguages };
			delete newLanguageSet[language];
			return newLanguageSet;
		});
	};

	// const getExperience = (language) => {
	// 	return selectedLanguages[language];
	// };

	const updateLanguage = (language, experience) => {
		const updatedLanguage = { [language]: experience };
		setSelectedLanguages({
			...selectedLanguages,
			...updatedLanguage,
		});
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
					<Paper sx={{ padding: 1 }}>
						<Grid container rowSpacing={1}>
							<Grid item xs={12}>
								<Typography variant="caption">Selected Languages:</Typography>
							</Grid>
							{Object.keys(selectedLanguages).map((language) => (
								<React.Fragment key={language}>
									<Grid item xs={4}>
										<Chip
											label={language}
											onDelete={() => {
												removeLanguage(language);
											}}
											color="success"
										/>
									</Grid>
									<Grid item xs={8}>
										<ExperiencePicker
											language={language}
											updateLanguage={updateLanguage}
											experience = {user === null ? (
												0
											) :(
												user["programmingLanguages"][language]
											)}
										></ExperiencePicker>
									</Grid>
								</React.Fragment>
							))}
						</Grid>
					</Paper>
				) : null}
			</Stack>
		</>
	);
}

export default LanguagesPicker;
