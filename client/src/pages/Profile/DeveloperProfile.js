import {
	Avatar,
	Container,
	Grid,
	Paper,
	Stack,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import { groupByAccepted, totalMoney } from "../../utils/contractSorting";

import ContractList from "../../components/ContractList/ContractList";
import ExperiencePicker from "../../components/LanguagesPicker/ExperiencePicker";
import { currencyFormatter } from "../../utils/utils.js";
import { devicons } from "../../utils/mapLanguageToIcon";
import { fetchDevelopersContracts } from "../../utils/apiCalls";

function DeveloperProfile(props) {
	const [moneyMade, setMoneyMade] = useState(0);
	const [numberAcceptedContracts, setNumberAcceptedContracts] = useState(0);
	const { viewUser, authUser } = props;

	useEffect(() => {
		getContractSummary();
	}, [viewUser]);

	function getContractSummary() {
		fetchDevelopersContracts(viewUser.username).then((res) => {
			setMoneyMade(totalMoney(groupByAccepted(res, viewUser["developerID"])));
			setNumberAcceptedContracts(
				groupByAccepted(res, viewUser["developerID"]).length
			);
		});
	}

	return (
		<Container>
			<Grid container spacing={2} padding={3}>
				<Grid item xs={12} md={4}>
					<Paper elevation={5} sx={{ height: "100%" }}>
						<Grid
							container
							alignItems="center"
							padding={2}
							justifyContent="space-between"
						>
							<Grid item>
								<Avatar
									sx={{
										width: 100,
										height: 100,
										borderRadius: "16px",
										border: 4,
									}}
									src={viewUser.avatarUrl}
								/>
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
					<Paper elevation={4} sx={{ height: "100%" }}>
						<TableContainer>
							<Table>
								<TableHead>
									<StyledTableRow>
										<StyledTableCell>
											<Typography variant="h5">
												Programming Languages
											</Typography>
										</StyledTableCell>
										<StyledTableCell>
											<Typography variant="h5">Experience</Typography>
										</StyledTableCell>
									</StyledTableRow>
								</TableHead>
								<TableBody>
									{Object.keys(viewUser.programmingLanguages).map(
										(language) => {
											const experience =
												viewUser.programmingLanguages[language];
											return (
												<StyledTableRow key={language}>
													<StyledTableCell>
														<Stack
															direction="row"
															spacing={1}
															alignItems="center"
														>
															<Avatar
																sx={{
																	width: 24,
																	height: 24,
																	backgroundColor: "white",
																	border: 3,
																	borderColor: "white",
																}}
																src={devicons[language]}
															/>
															<Typography>{language}</Typography>
														</Stack>
													</StyledTableCell>
													<StyledTableCell>
														<ExperiencePicker
															readOnly={true}
															presetValue={experience}
														/>
													</StyledTableCell>
												</StyledTableRow>
											);
										}
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper elevation={4} sx={{ height: "100%" }}>
						<Stack>
							{authUser.username == viewUser.username && (
								<Stack
									backgroundColor="#388e3c"
									padding={1}
									borderRadius={1}
									justifyContent="flex-start"
								>
									<Typography variant="caption">Money made:</Typography>
									<Typography variant="h4" align="center">
										{currencyFormatter.format(moneyMade)}
									</Typography>
								</Stack>
							)}
							<Stack padding={1} justifyContent="flex-start">
								<Typography variant="caption" color="#24bf2c">
									Number of Successful Applications:
								</Typography>
								<Typography variant="h4" align="center">
									{numberAcceptedContracts}
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
							sx={{ height: "100%" }}
						/>
					</Grid>
				)}
			</Grid>
		</Container>
	);
}

export default DeveloperProfile;
