import React, { useEffect, useState } from "react";
import { useUser } from "../../AuthProvider";
import {
	Avatar,
	Container,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Grid,
} from "@mui/material";

import ExperiencePicker from "../../components/LanguagesPicker/ExperiencePicker";
import EditProfile from "./EditProfile";
import { useParams } from "react-router-dom";

import { fetchUserProfile } from "../../utils/utils";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function Profile() {
	const authUser = useUser();
	const [viewUser, setViewUser] = useState(null);

	const params = useParams();

	useEffect(() => {
		// TODO: only fetches developer profiles
		fetchUserProfile(params.userType, params.username).then((data) => {
			setViewUser(data);
		});
	}, [params]);

	console.log(viewUser);

	// eslint-disable-next-line no-constant-condition
	if (!viewUser) {
		// shows user is loading
		return <LoadingPage />;
	}

	return (
		<React.Fragment>
			{authUser.username == viewUser.username ? (
				<>
					<EditProfile />
				</>
			) : null}

			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={4}>
						<Paper elevation={4}>
							<Grid
								container
								alignItems="center"
								padding={2}
								justifyContent="space-between"
							>
								<Grid item>
									<Avatar
										sx={{ width: 100, height: 100 }}
										src={viewUser.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item>
									{viewUser.userType === "developer" ? (
										<Stack>
											<Typography variant="h3">
												{viewUser.firstName} {viewUser.lastName}
											</Typography>
											<Typography variant="h5">{viewUser.username}</Typography>
											<Typography variant="h6">{viewUser.email}</Typography>
										</Stack>
									) : (
										<Stack>
											<Typography variant="h3">{viewUser.username}</Typography>
											<Typography variant="h6">{viewUser.email}</Typography>
										</Stack>
									)}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper elevation={4}>
							{viewUser.userType === "developer" ? ( //Table for developer experience
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													<Typography variant="h5">
														Programming Languages
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h5">Experience</Typography>
												</TableCell>
											</TableRow>
											{Object.keys(viewUser.programmingLanguages).map(
												(language) => {
													const experience =
														viewUser.programmingLanguages[language];

													return (
														<TableRow key={language}>
															<TableCell>
																<Typography>{language}</Typography>
															</TableCell>
															<TableCell>
																<ExperiencePicker
																	disabled={true}
																	presetValue={experience}
																/>
															</TableCell>
														</TableRow>
													);
												}
											)}
										</TableHead>
										<TableBody></TableBody>
									</Table>
								</TableContainer>
							) : (
								//random stuff for company? maybe money too
								<div>Test</div>
							)}
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Profile;
