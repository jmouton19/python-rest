import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	fetchAllCompaniesForSearching,
	fetchAllDevelopersForSearching,
} from "../../utils/apiCalls";

import StyledLink from "../StyledLink";
import { filterBySearchValue } from "../../utils/contractSorting";

export default function SearchMenu({ open, searchValue }) {
	const [developers, setDevelopers] = useState(null);
	const [companies, setCompanies] = useState(null);

	const loading = developers === null || companies === null;

	useEffect(() => {
		fetchAllDevelopersForSearching().then((data) => setDevelopers(data));
		fetchAllCompaniesForSearching().then((data) => setCompanies(data));
	}, []);

	let searchResults;
	let searchQueryMessage;
	let searchResultsMessage;
	if (!loading) {
		searchResults = filterBySearchValue(searchValue, companies, developers);
		const numberOfSearchResults = searchResults.length;

		searchQueryMessage = `Showing results for "${searchValue}":`;
		if (numberOfSearchResults == 0) {
			searchResultsMessage = "No results found.";
		} else if (numberOfSearchResults == 1) {
			searchResultsMessage = "1 result found.";
		} else {
			searchResultsMessage = `${numberOfSearchResults} results found.`;
		}
	} else {
		searchQueryMessage = `Showing results for "${searchValue}":`;
		searchResultsMessage = `Loading results for "${searchValue}"`;
	}

	if (open)
		return (
			<div
				sx={{
					position: "fixed",
					width: "5000",
					height: "5000",
					zIndex: 9999998,
					backGroudColor: "black",
				}}
			>
				<Paper
					elevation={10}
					sx={{
						position: "fixed",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: "90%",
						maxHeight: "90%",
						zIndex: 9999999,
					}}
				>
					<List
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
					>
						<ListItem>
							<ListItemText
								primary={searchQueryMessage}
								secondary={searchResultsMessage}
							/>
						</ListItem>
						{searchResults &&
							searchResults.map((user) => {
								let fullNameFormatted;
								if (user.userType == "developer")
									fullNameFormatted = `(${user.name} ${user.surname})`;
								return (
									<StyledLink
										key={user.username}
										to={`/profile/${user.userType}/${user.username}`}
									>
										<ListItem>
											<ListItemAvatar>
												<Avatar src={user.avatar} />
											</ListItemAvatar>

											<ListItemText
												primary={`${user.username} ${
													fullNameFormatted ? fullNameFormatted : ""
												}`}
												secondary={
													user.userType == "developer" ? "Developer" : "Company"
												}
											/>
										</ListItem>
									</StyledLink>
								);
							})}
					</List>
				</Paper>
			</div>
		);

	return null;
}
