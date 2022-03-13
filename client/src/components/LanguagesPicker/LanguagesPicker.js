import React, { useEffect, useRef, useState } from "react";
import { alpha, styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import ExperiencePicker from "./ExperiencePicker";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";

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
	const [languageList, setLanguageList] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [selectedLanguages, setSelectedLanguages] = useState({});
	const { presetLanguages, setLanguagesCallback } = props;
	const searchBarRef = useRef();

	//Populate exisiting languages and get language list from server
	useEffect(() => {
		getLanguages();
		if (presetLanguages) {
			setSelectedLanguages({
				...presetLanguages,
			});
		}
	}, []);

	function getLanguages() {
		const baseUrl = "https://cs334proj1group8.herokuapp.com";

		const url = `${baseUrl}/api/languages`;

		axios
			.get(url)
			.then((res_GET) => {
				const { success } = res_GET.data;
				if (success) {
					setLanguageList(res_GET.data["languages"]);
				} else {
					setLanguageList([
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
					]);
					console.error(
						"Unable to retrieve languages, falling back on default 10."
					);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}

	// execute callback function, if defined, whenever the selected languages change
	useEffect(() => {
		if (setLanguagesCallback) {
			setLanguagesCallback(selectedLanguages);
		}
	}, [selectedLanguages]);

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
			<Stack direction="column" spacing={1}>
				<InputLabel> Add your programming languages</InputLabel>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						inputRef={searchBarRef}
					/>
				</Search>
				{searchValue !== "" ? (
					<Paper sx={{ borderRadius: 1 }}>
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
									setSearchValue("");
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
											presetValue={selectedLanguages[language]}
										/>
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
