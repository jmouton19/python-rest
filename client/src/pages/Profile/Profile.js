import React from "react";
import { useUser, useAuth } from "../../AuthProvider";
import Grid from "@mui/material/Grid";
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
} from "@mui/material";

import ExperiencePicker from "../../components/LanguagesPicker/ExperiencePicker";
import EditProfile from "./EditProfile";

function Profile() {
	const auth = useAuth();
	const user = useUser();

	return (
		<React.Fragment>
			{auth ? (
				<>
					<EditProfile/>
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
										src={user.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item>
									{user.userType === "developer" ? (
										<Stack>
											<Typography variant="h3">
												{user.firstName} {user.lastName}
											</Typography>
											<Typography variant="h5">{user.username}</Typography>
											<Typography variant="h6">{user.email}</Typography>
										</Stack>
									) : (
										<Stack>
											<Typography variant="h3">{user.username}</Typography>
											<Typography variant="h6">{user.email}</Typography>
										</Stack>
									)}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper elevation={4}>
							{user.userType === "developer" ? ( //Table for developer experience
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
											{Object.keys(user.programmingLanguages).map(
												(language) => {
													const experience =
														user.programmingLanguages[language];

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
