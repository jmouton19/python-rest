import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
} from "../../utils/contractSorting";
import {
	Avatar,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingPage from "../LoadingPage/LoadingPage";
import ContractCard from "../ContractCard/ContractCard";
import { useUser } from "../../AuthProvider";
import { useTheme } from "@mui/material";
import {
	applyToContract,
	deleteContract,
	fetchAllContracts,
} from "../../utils/apiCalls";
import { Link } from "react-router-dom";

function ContractList({ method, descending, viewUser, condensed }) {
	const [contractsData, setContractsData] = useState(null);
	const authUser = useUser();
	const theme = useTheme();

	useEffect(() => {
		getContracts();
	}, []);

	function getContracts() {
		fetchAllContracts().then((data) => {
			setContractsData(data);
		});
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
								{viewUser.userType == "company" && <TableCell />}
							</TableRow>
						</TableHead>
						<TableBody>
							{contractsData.map((contract) => (
								<TableRow key={contract.contract_id}>
									{viewUser.userType == "developer" && (
										<TableCell>
											<Stack direction="row" spacing={1} alignItems="center">
												<Avatar
													src={contract["company_avatar"]}
													sx={{ width: 24, height: 24 }}
												/>
												<Typography>{contract.company_name}</Typography>
											</Stack>
										</TableCell>
									)}
									<TableCell>{contract.title}</TableCell>
									<TableCell>{contract.value}</TableCell>
									<TableCell>{contract.length}</TableCell>
									{authUser.username === viewUser.username &&
										viewUser.userType === "company" && ( //If a company is viewing their own page
										<TableCell align="right" style={{ width: 128 }}>
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
										</TableCell>
									)}
									{authUser["userType"] == "developer" &&
										viewUser.userType == "company" && ( //If dev is viewing a company page
										<TableCell align="right">
											<Button
												size="small"
												variant="contained"
												onClick={() =>
													applyToContract(
														authUser.username,
														contract.contract_id
													).then(() => getContracts())
												}
											>
													Apply
											</Button>
										</TableCell>
									)}
								</TableRow>
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
						></ContractCard>
					))}
				</Stack>
			</>
		);
	}
}

export default ContractList;
