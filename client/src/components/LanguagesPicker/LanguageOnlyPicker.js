import { Chip, Paper, Stack, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Search, StyledInputBaseFull } from "../searchbar";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { SearchIconWrapper } from "../searchbar";
import axios from "axios";
import { devicons } from "../../utils/mapLanguageToIcon";

function LanguageOnlyPicker({ onChange }) {
	const [searchValue, setSearchValue] = useState("");
	const searchBarRef = useRef();
	const [allLanguages, setAllLanguages] = useState([]);
	const [selectedLanguages, setSelectedLanguages] = useState([]);

	useEffect(() => {
		axios
			.get("https://cs334proj1group8.herokuapp.com/api/languages")
			.then((res) => {
				const { success } = res.data;
				if (success) {
					setAllLanguages(res.data.languages);
				} else {
					console.error(res);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		if (onChange) onChange(selectedLanguages);
	}, [selectedLanguages]);

	const unselectedLanguages = allLanguages.filter(
		(language) => !selectedLanguages.includes(language)
	);

	const filteredLanguages = unselectedLanguages.filter(
		(value) => value.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
	);

	const addNewLanguage = (language) => {
		setSelectedLanguages(selectedLanguages.concat(language));
	};

	const removeLanguage = (language) => {
		setSelectedLanguages(
			selectedLanguages.filter((value) => value !== language)
		);
	};

	return (
		<Stack spacing={1}>
			<Search>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBaseFull
					placeholder="Filter by Languages..."
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					inputRef={searchBarRef}
				/>
			</Search>
			{searchValue !== "" && (
				<Paper sx={{ borderRadius: 1 }}>
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
			)}
			{selectedLanguages.length > 0 && (
				<Paper sx={{ borderRadius: 1, padding: 2 }}>
					<Stack direction="row" spacing={2}>
						{selectedLanguages.map((language) => (
							<Tooltip title={`Remove ${language}`} key={language}>
								<img
									src={devicons[language]}
									style={{ width: 35, height: 35 }}
									onClick={() => removeLanguage(language)}
								/>
							</Tooltip>
						))}
					</Stack>
				</Paper>
			)}
		</Stack>
	);
}

export default LanguageOnlyPicker;
