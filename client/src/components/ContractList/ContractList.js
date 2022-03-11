import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
	groupByOpen,
	groupByClosed,
	groupByAccepted,
} from "../../utils/contractSorting";
import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingPage from "../LoadingPage/LoadingPage";
import ContractCard from "../ContractCard/ContractCard";
import { useTheme } from "@mui/material";
import {
	applyToContract,
	cancelApplication,
	deleteContract,
	fetchAllOpenContracts,
	fetchCompanysContracts,
	fetchDevelopersContracts,
} from "../../utils/apiCalls";
import { Link } from "react-router-dom";
import ContractTable from "../ContractTable/ContractTable";

function ContractList({ method, descending, viewUser, authUser, condensed, status }) {
	const [contractsData, setContractsData] = useState(null);
	const theme = useTheme();

	useEffect(() => {
		getContracts();
	}, []);

	function getContracts() {
		switch(status) {
		case "available":
			fetchAllOpenContracts().then((data) => {
				setContractsData(data);
			});
			break;
		case "applied":
			fetchDevelopersContracts(viewUser.username).then((data) => { 
				setContractsData(groupByOpen(data));
			});
			break;
		case "accepted":
			fetchDevelopersContracts(viewUser.username).then((data) => { 
				setContractsData(groupByAccepted(data));
			});
			break;
		case "open":
			fetchCompanysContracts(viewUser.username).then((data) => { 
				setContractsData(groupByOpen(data));
			});
			break;
		case "closed":
			fetchCompanysContracts(viewUser.username).then((data) => { 
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

	if (contractsData === null) {
		return <LoadingPage />;
	}
	
	if (contractsData == undefined) {
		return <></>;
	}

	if (condensed) {
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
								<TableCell/>
							</TableRow>
						</TableHead>
						<TableBody>
							{contractsData.map((contract) => (
								<ContractTable key={contract.contract_id} contract={contract} viewUser={viewUser}>
									{authUser.userType === "company" ? ( //If a company is viewing 
										<>
											{authUser.username == viewUser.username && ( //If a company is viewing their own
												<>
													<Button size="small" variant="contained" component={Link} to={`/contract/${contract.contract_id}`}>
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
									):( //If a dev is viewing
										<>
											<>
												{authUser.username == viewUser.username && ( //If a dev is viewing their own
													<>
														<Button
															color="error"
															size="small"
															onClick={() =>
																cancelApplication(authUser.username, contract.contract_id).then(() => {
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
																applyToContract(authUser.username, contract.contract_id).then(() => {
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
					{contractsData.map((contract) => (
						<ContractCard
							key={contract.contract_id}
							contract={contract}
						>
							{status == "available" && (
								<>
									<Button
										variant="contained"
										size="small"
										onClick={() =>
											applyToContract(authUser.username, contract.contract_id).then(() => {
												getContracts();
											})
										}
									>
										Apply
									</Button>
								</>
							)}
						</ContractCard>
					))}
				</Stack>
			</>
		);
	}
}

export default ContractList;
