import React, { useEffect, useState } from "react";
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
import { fetchDevelopersContracts } from "../../utils/apiCalls";
import { useTheme } from "@mui/material";
import { devicons } from "../../utils/mapLanguageToIcon";
import { groupByAccepted, totalMoney } from "../../utils/contractSorting";

function DeveloperProfile(props) {
	const theme = useTheme();
	const [moneyMade, setMoneyMade] = useState(0);
	const [employed, setEmployed] = useState(0);
	const { viewUser, authUser } = props;

	useEffect(() => {
		getContractSummary();
	}, [viewUser]);

	function getContractSummary() {
		fetchDevelopersContracts(viewUser.username).then((res) => {
			setMoneyMade(totalMoney(groupByAccepted(res, viewUser["developerID"])));
			setEmployed(groupByAccepted(res, viewUser["developerID"]).length);
			console.log(viewUser);
		});
	}

	return(
		<>
			<Container>
				<Grid container spacing={2} padding={3}>
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
					<Grid item xs={12} md={4}>
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.g2}}>
							<Stack >
								{authUser.username == viewUser.username && (
									<Stack backgroundColor="#388e3c" padding={1} borderRadius= {1} justifyContent="flex-start">
										<Typography variant="caption" color={theme.palette.text.light}>
											Money made:
										</Typography>
										<Typography  variant="h4" color={theme.palette.text.light} align="center">
											$ {moneyMade}
										</Typography>
									</Stack>
								)}
								<Stack padding={1} justifyContent="flex-start">
									<Typography variant="h6" color={theme.palette.text.light} align="center">
										Times employed: {employed}
									</Typography>
								</Stack>
							</Stack>
						</Paper>	
					</Grid>
					{authUser["username"] == viewUser["username"] && (
						<Grid item xs={12} md={8}>				
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
				</Grid>
			</Container>
		</>
	);
}

export default DeveloperProfile;