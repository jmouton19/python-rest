import {
	Button,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableHead,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../StyledTable";
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
import { useNotifyError, useNotifySuccess } from "../../NotificationProvider";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import ContractCard from "../ContractCard/ContractCard";
import ContractCardSkeleton from "../ContractCard/ContractCardSkeleton";
import ContractTable from "../ContractTable/ContractTable";
import DeleteIcon from "@mui/icons-material/Delete";
import LanguageOnlyPicker from "../LanguagesPicker/LanguageOnlyPicker";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Typography } from "@mui/material";

function ContractList({
	method,
	descending,
	viewUser,
	authUser,
	condensed,
	status,
}) {
	const [contractsData, setContractsData] = useState(null);
	const [filteredContractsData, setFilteredContractsData] = useState(null);

	function setBothContractsDataAndfilteredContractsData(data) {
		setFilteredContractsData(data);
		setContractsData(data);
	}

	const navigate = useNavigate();
	const notifySuccess = useNotifySuccess();
	const notifyError = useNotifyError();

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
					setBothContractsDataAndfilteredContractsData(
						openNotAppliedContracts
					);
				});
			});
			break;
		case "applied":
			fetchDevelopersContracts(username).then((data) => {
				setBothContractsDataAndfilteredContractsData(groupByOpen(data));
			});
			break;
		case "accepted":
			fetchDevelopersContracts(username).then((data) => {
				setBothContractsDataAndfilteredContractsData(
					groupByAccepted(data, developer_id)
				);
			});
			break;
		case "open":
			fetchCompanysContracts(username).then((data) => {
				setBothContractsDataAndfilteredContractsData(groupByOpen(data));
			});
			break;
		case "closed":
			fetchCompanysContracts(username).then((data) => {
				setBothContractsDataAndfilteredContractsData(groupByClosed(data));
			});
			break;
		}
	}

	if (filteredContractsData !== null) {
		switch (method) {
		case "date":
			sortByDate(filteredContractsData, descending);
			break;
		case "value":
			sortByValue(filteredContractsData, descending);
			break;
		case "duration":
			sortByDuration(filteredContractsData, descending);
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
		if (filteredContractsData === null) {
			return <LoadingPage minHeight="150px" />;
		}
		return (
			//Return small table version of contracts
			<>
				<Paper elevation={4} sx={{ height: "100%" }}>
					<Box padding={1}>
						<Typography variant="caption" color="primary">
							{viewUser.userType == "developer"
								? "Pending Applications:"
								: "Open Contracts:"}
						</Typography>
					</Box>
					{filteredContractsData.length == 0 ? (
						<Box padding={1}>
							{viewUser.userType == "developer" && (
								<Stack padding={1}>
									<Typography variant="body" color="text">
										No pending applications.
									</Typography>
								</Stack>
							)}
							{viewUser.userType == "company" && (
								<Stack padding={1}>
									<Typography variant="body" color="text">
										No open contracts.
									</Typography>
								</Stack>
							)}
						</Box>
					) : (
						<Table>
							<TableHead>
								<StyledTableRow>
									{viewUser.userType == "developer" && (
										<StyledTableCell>
											<b>Company</b>
										</StyledTableCell>
									)}
									<StyledTableCell>
										<b>Title</b>
									</StyledTableCell>
									<StyledTableCell>
										<b>Value</b>
									</StyledTableCell>
									<StyledTableCell>
										<b>Duration</b>
									</StyledTableCell>
									<StyledTableCell />
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{filteredContractsData.map((contract) => (
									<ContractTable
										key={contract.contract_id}
										contract={contract}
										viewUser={viewUser}
									>
										{authUser.userType === "company" ? ( //If a company is viewing
											<Stack direction="row" spacing={1}>
												{authUser.username == viewUser.username && ( //If a company is viewing their own
													<>
														<Button
															size="small"
															variant="contained"
															component={Link}
															to={`/applications/${contract.contract_id}`}
														>
															View
														</Button>
														<Button
															color="error"
															size="small"
															onClick={() =>
																deleteContract(contract.contract_id)
																	.then(() => {
																		notifySuccess("Contract was deleted.");
																		getContracts();
																	})
																	.catch((msg) => {
																		notifyError(msg);
																	})
															}
														>
															<DeleteIcon />
														</Button>
													</>
												)}
											</Stack>
										) : (
											//If a dev is viewing
											<Stack direction="row" spacing={1}>
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
																	)
																		.then(() => {
																			notifySuccess(
																				"The application was withdrawn"
																			);
																			getContracts();
																		})
																		.catch((msg) => notifyError(msg))
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
																	)
																		.then(() => {
																			notifySuccess(
																				"You have successfully applied."
																			);
																			getContracts();
																		})
																		.catch((msg) => notifyError(msg))
																}
															>
																Apply
															</Button>
														</>
													)}
												</>
											</Stack>
										)}
									</ContractTable>
								))}
							</TableBody>
						</Table>
					)}
				</Paper>
			</>
		);
	} else {
		let emptyListMessage;
		if (status == "available")
			emptyListMessage = "No contracts available at the moment.";
		if (status == "applied")
			emptyListMessage =
				"You don't have any pending contracts. If you have already applied, check the Accepted tab to see if you were successful.";
		if (status == "accepted")
			emptyListMessage = "You have not been accepted to any contracts.";
		if (status == "open")
			emptyListMessage =
				"You have no open contracts. Click + to create one now.";
		if (status == "closed")
			emptyListMessage = "You have not accepted any developer for a contract.";
		return (
			//Return large card version of contracts
			<>
				<LanguageOnlyPicker
					onChange={(languages) => {
						if (languages.length > 0) {
							const newData = contractsData.filter((contract) => {
								let match = false;
								languages.forEach((language) => {
									if (
										Object.keys(contract.contract_languages).includes(language)
									) {
										match = true;
									}
								});
								return match;
							});
							setFilteredContractsData(newData);
						}
					}}
				/>

				<Stack spacing={2}>
					{authUser.userType === "company" && status === "open" && (
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
					{filteredContractsData === null ? (
						<ContractCardSkeleton />
					) : filteredContractsData.length == 0 ? (
						<Box mt={2}>
							<Typography variant="caption" color="primary">
								{emptyListMessage}
							</Typography>
						</Box>
					) : (
						filteredContractsData.map((contract) => {
							return (
								<ContractCard
									noAvatar={authUser.userType === "company"}
									key={contract.contract_id}
									contract={contract}
									actions={actions}
									onAction={(action) => {
										if (action == "apply") {
											applyToContract(authUser.username, contract.contract_id)
												.then(() => {
													notifySuccess("You have sucessfuly applied.");
													getContracts();
												})
												.catch((msg) => notifyError(msg));
										}
										if (action == "delete") {
											deleteContract(contract.contract_id)
												.then(() => {
													notifySuccess("Contract was deleted.");
													getContracts();
												})
												.catch((msg) => {
													notifyError(msg);
												});
										}
										if (action == "cancel application") {
											cancelApplication(authUser.username, contract.contract_id)
												.then(() => {
													notifySuccess(
														"Application to contract was withdrawn."
													);
													getContracts();
												})
												.catch((msg) => {
													notifyError(msg);
												});
										}
										if (action == "view applicants") {
											navigate(`/applications/${contract.contract_id}`);
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
