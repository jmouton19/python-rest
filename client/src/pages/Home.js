import "./Home.css";

import { Container, Grid, Paper, Stack, Typography } from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import React from "react";
import StyledLink from "../components/StyledLink";
import { useUser } from "../AuthProvider";

const StyledAppButton = ({ label, Icon, to }) => {
	return (
		<StyledLink to={to} sx={{ textDecoration: "none" }}>
			<Paper elevation={4} sx={{ backgroundColor: "#222222" }}>
				<Stack
					direction="column"
					minHeight={150}
					justifyContent="center"
					alignItems="center"
				>
					<Icon sx={{ fontSize: 50 }} color="primary" />
					<Typography variant="caption" color="primary">
						{label}
					</Typography>
				</Stack>
			</Paper>
		</StyledLink>
	);
};

function Home() {
	const authUser = useUser();

	let URLToProfile;
	if (authUser) {
		URLToProfile = `./profile/${authUser.userType}/${authUser.username}`;
	} else {
		URLToProfile = "/signUp";
	}

	return (
		<>
			<Container maxWidth="sm">
				<Grid container spacing={4} mt={2}>
					{authUser && (
						<Grid item xs={12}>
							<Typography variant="h5" color="initial">
								{`Hi, ${
									authUser.userType == "developer"
										? authUser.firstName
										: authUser.username
								}!`}
							</Typography>
							<Typography variant="caption" color="initial">
								What do you want to do today?
							</Typography>
						</Grid>
					)}
					{!authUser && (
						<Grid item xs={12} sm={6}>
							<StyledAppButton
								label="Sign Up"
								Icon={AppRegistrationIcon}
								to="./signup"
							/>
						</Grid>
					)}
					{!authUser && (
						<Grid item xs={12} sm={6}>
							<StyledAppButton
								label="Log In"
								Icon={LoginOutlinedIcon}
								to="./login"
							/>
						</Grid>
					)}
					<Grid item xs={12} sm={6}>
						<StyledAppButton
							label="View Contracts"
							Icon={ContactPageOutlinedIcon}
							to="./contracts"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<StyledAppButton
							label="View My Profile"
							Icon={FeedOutlinedIcon}
							to={URLToProfile}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Home;
