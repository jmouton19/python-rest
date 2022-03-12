import {
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import {
	applyToContract,
	cancelApplication,
	deleteContract,
	fetchAllOpenContracts,
	fetchCompanysContracts,
	fetchDevelopersContracts,
} from "../../utils/apiCalls";
import {
	groupByAccepted,
	groupByClosed,
	groupByOpen,
	sortByDate,
	sortByDuration,
	sortByValue,
} from "../../utils/contractSorting";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import ContractCard from "../ContractCard/ContractCard";
import ContractCardSkeleton from "../ContractCard/ContractCardSkeleton";
import ContractTable from "../ContractTable/ContractTable";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingPage from "../LoadingPage/LoadingPage";

function ContractList({
	method,
	descending,
	viewUser,
	authUser,
	condensed,
	status,
}) {
	const [contractsData, setContractsData] = useState(null);
	const theme = useTheme();

	const navigate = useNavigate();

	console.debug(contractsData);

	useEffect(() => {
		getContracts();
	}, []);

	function getContracts() {
		const username = condensed ? viewUser.username : authUser.username;
		const developer_id = condensed
			? viewUser.developer_id
			: authUser.developerID;
		switch (status) {
		case "available":
			// all open contracts that the developer have not applied for
			fetchAllOpenContracts().then((openContracts) => {
				fetchDevelopersContracts(username).then((appliedContracts) => {
					const openNotAppliedContracts = openContracts.filter(
						(openContract) => {
							const appliedIDs = appliedContracts.map(
								(appliedContract) => appliedContract.contract_id
							);
							return appliedIDs.indexOf(openContract.contract_id) === -1;
						}
					);
					setContractsData(openNotAppliedContracts);
				});
			});
			break;
		case "applied":
			fetchDevelopersContracts(username).then((data) => {
				setContractsData(groupByOpen(data));
			});
			break;
		case "accepted":
			fetchDevelopersContracts(username).then((data) => {
				setContractsData(groupByAccepted(data, developer_id));
			});
			break;
		case "open":
			fetchCompanysContracts(username).then((data) => {
				setContractsData(groupByOpen(data));
			});
			break;
		case "closed":
			fetchCompanysContracts(username).then((data) => {
				setContractsData(groupByClosed(data));
			});
			break;
		}
	}

	if (contractsData !== null) {
		switch (method) {
		case "date":
			sortByDate(contractsData, descending);
			break;
		case "value":
			sortByValue(contractsData, descending);
			break;
		case "duration":
			sortByDuration(contractsData, descending);
			break;
		default:
			break;
		}
	}

	let actions;
	if (authUser.userType == "developer") {
		if (status == "available") {
			actions = ["apply"];
		}
		if (status == "applied") {
			actions = ["cancel application"];
		}
		if (status == "accepted") {
			actions = [];
		}
	}
	if (authUser.userType == "company") {
		if (status == "open") {
			actions = ["delete", "view applicants"];
		}
		if (status == "closed") {
			actions = ["delete"];
		}
	}

	if (condensed) {
		if (contractsData === null) {
			return <LoadingPage />;
		}
		return (
			//Return small table version of contracts
			<>
				<Paper elevation={4} sx={{ backgroundColor: theme.palette.primary.g5 }}>
					<Table>
						<TableHead>
							<TableRow>
								{viewUser.userType == "developer" && (
									<TableCell>
										<b>Company</b>
									</TableCell>
								)}
								<TableCell>
									<b>Title</b>
								</TableCell>
								<TableCell>
									<b>Value</b>
								</TableCell>
								<TableCell>
									<b>Duration</b>
								</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{contractsData.map((contract) => (
								<ContractTable
									key={contract.contract_id}
									contract={contract}
									viewUser={viewUser}
								>
									{authUser.userType === "company" ? ( //If a company is viewing
										<>
											{authUser.username == viewUser.username && ( //If a company is viewing their own
												<>
													<Button
														size="small"
														variant="contained"
														component={Link}
														to={`/contract/${contract.contract_id}`}
													>
														View
													</Button>
													<Button
														color="error"
														size="small"
														onClick={() =>
															deleteContract(contract.contract_id).then(() => {
																getContracts();
															})
														}
													>
														<DeleteIcon />
													</Button>
												</>
											)}
										</>
									) : (
										//If a dev is viewing
										<>
											<>
												{authUser.username == viewUser.username && ( //If a dev is viewing their own
													<>
														<Button
															color="error"
															size="small"
															onClick={() =>
																cancelApplication(
																	authUser.username,
																	contract.contract_id
																).then(() => {
																	getContracts();
																})
															}
														>
															<DeleteIcon />
														</Button>
													</>
												)}
											</>
											<>
												{viewUser.userType == "company" && ( //If a dev is viewing a company
													<>
														<Button
															variant="contained"
															size="small"
															onClick={() =>
																applyToContract(
																	authUser.username,
																	contract.contract_id
																).then(() => {
																	getContracts();
																})
															}
														>
															Apply
														</Button>
													</>
												)}
											</>
										</>
									)}
								</ContractTable>
							))}
						</TableBody>
					</Table>
				</Paper>
			</>
		);
	} else {
		return (
			//Return large card version of contracts
			<>
				<Stack spacing={2}>
					{authUser.userType == "company" && (
						<Paper sx={{ padding: 2, display: "flex" }} elevation={4}>
							<Box sx={{ flexGrow: 1 }} />
							<Stack>
								<IconButton onClick={() => navigate("/addContract")}>
									<AddIcon />
								</IconButton>
							</Stack>
							<Box sx={{ flexGrow: 1 }} />
						</Paper>
					)}
					{contractsData === null ? (
						<ContractCardSkeleton />
					) : contractsData.length == 0 ? (
						<Box mt={2}>
							<Typography variant="caption" color="initial">
								Nothing to display.
							</Typography>
						</Box>
					) : (
						contractsData.map((contract) => {
							console.log(contract);
							return (
								<ContractCard
									noAvatar
									key={contract.contract_id}
									contract={contract}
									actions={actions}
									onAction={(action) => {
										if (action == "apply") {
											applyToContract(
												authUser.username,
												contract.contract_id
											).then(() => {
												getContracts();
											});
										}
										if (action == "delete") {
											deleteContract(contract.contract_id).then(() => {
												getContracts();
											});
										}
										if (action == "cancel application") {
											cancelApplication(
												authUser.username,
												contract.contract_id
											).then(() => {
												getContracts();
											});
										}
										if (action == "view applicants") {
											console.log(contract.contract_id);
											navigate(`/contract/${contract.contract_id}`);
										}
									}}
								/>
							);
						})
					)}
				</Stack>
			</>
		);
	}
}

export default ContractList;
