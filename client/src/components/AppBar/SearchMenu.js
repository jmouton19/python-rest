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

export default function SearchMenu({ open, searchValue }) {
	const [developers, setDevelopers] = useState(null);
	const [companies, setCompanies] = useState(null);

	const loading = developers === null || companies === null;

	useEffect(() => {
		fetchAllDevelopersForSearching().then((data) => setDevelopers(data));
		fetchAllCompaniesForSearching().then((data) => setCompanies(data));
	}, []);

	if (open)
		return (
			<Paper
				elevation={4}
				sx={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					maxWidth: "90%",
					maxHeight: "90%",
				}}
			>
				{loading ? (
					<>{`Loading results for "${searchValue}"`}</>
				) : (
					<List
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
					>
						<ListItem>
							<ListItemText primary={` Showing results for "${searchValue}"`} />
						</ListItem>
						{developers.map((developer) => {
							return (
								<StyledLink
									key={developer.username}
									to={`/profile/developer/${developer.username}`}
								>
									<ListItem>
										<ListItemAvatar>
											<Avatar src={developer.avatar} />
										</ListItemAvatar>

										<ListItemText
											primary={`${developer.username} (${developer.name} ${developer.surname})`}
											secondary="Developer"
										/>
									</ListItem>
								</StyledLink>
							);
						})}
					</List>
				)}
			</Paper>
		);

	return null;
}
