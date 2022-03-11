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
import { useTheme } from "@mui/material";
import { devicons } from "../../utils/mapLanguageToIcon";

function DeveloperProfile(props) {
	const theme = useTheme();
	const { viewUser, authUser } = props;


	return(
		<>
			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={12} md={4}>
						<Paper elevation={5} sx={{backgroundColor: theme.palette.primary.g1}}>
							<Grid
								container
								alignItems="center"
								padding={2}
								justifyContent="space-between"
							>
								<Grid item>
									<Avatar
										sx={{ width: 100, height: 100, borderRadius:"16px",border:4,borderColor: theme.palette.text.light}}
										src={viewUser.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item>
									<Stack>
										<Typography variant="h3" color={theme.palette.text.light}>
											{viewUser.firstName} {viewUser.lastName}
										</Typography>
										<Typography variant="h5" color={theme.palette.text.light}>{viewUser.username}</Typography>
										<Typography variant="h6" color={theme.palette.text.light}>{viewUser.email}</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={8}>
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.g2}}>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography variant="h5" color={theme.palette.text.light}>
													Programming Languages
												</Typography>
											</TableCell>
											<TableCell>
												<Typography variant="h5" color={theme.palette.text.light}>Experience</Typography>
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
															<Stack direction="row" spacing={1} alignItems="center">
																<Avatar sx={{ width: 24, height: 24, backgroundColor: "white", border:3, borderColor: "white"}} src={devicons[language]}/>
																<Typography color={theme.palette.text.light}>{language}</Typography>
															</Stack>
														</TableCell>
														<TableCell>
															<ExperiencePicker
																readOnly={true}
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
					{authUser["username"] == viewUser["username"] && (
						<Grid item xs={12} md={9}>				
							<ContractList 
								method="value"
								descending={true}
								condensed
								viewUser={viewUser}
								authUser={authUser}
								status="applied"
							>
							</ContractList>
						</Grid>
					)}
					<Grid item xs={12} md={3}>

					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default DeveloperProfile;