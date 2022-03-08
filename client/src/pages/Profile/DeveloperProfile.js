import React from "react";
import {
	Avatar,
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
	Container,
} from "@mui/material";

import ExperiencePicker from "../../components/LanguagesPicker/ExperiencePicker";
import ContractList from "../../components/ContractList/ContractList";

function DeveloperProfile(props) {
	const { auth , viewUser } = props;
	console.log(auth);


	return(
		<>
			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={12} md={4}>
						<Paper elevation={5}>
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
									<Stack>
										<Typography variant="h3">
											{viewUser.firstName} {viewUser.lastName}
										</Typography>
										<Typography variant="h5">{viewUser.username}</Typography>
										<Typography variant="h6">{viewUser.email}</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={8}>
						<Paper elevation={4}>
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
									</TableHead>
									<TableBody>
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
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
					<Grid item xs={12} md={9}>				
						<ContractList 
							method="value"
							descending={true}
							//axiosUrl={`https://cs334proj1group8.herokuapp.com/api/developer/${viewUser["username"]}/application`}
							axiosUrl={"https://cs334proj1group8.herokuapp.com/api/contract"}
							condensed={true}
						>
						</ContractList>
					</Grid>
					<Grid item xs={12} md={3}>

					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default DeveloperProfile;