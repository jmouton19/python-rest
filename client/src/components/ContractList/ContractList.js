import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
} from "../../utils/contractSorting";
import {  Avatar, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingPage from "../LoadingPage/LoadingPage";
import axios from "axios";
import ContractCard from "../ContractCard/ContractCard";
import { useUser } from "../../AuthProvider";

function ContractList({ method, descending, axiosUrl}) {
	const [contractsData, setContractsData] = useState(null);
	const authUser = useUser();
	const baseUrl = "https://cs334proj1group8.herokuapp.com";
	
	useEffect(() => {
		fetchContracts();
	}, []);

	function fetchContracts() {
		axios
			.get(axiosUrl)
			.then((res) => {
				const { success } = res.data;
				if (success) {
					setContractsData(res.data.contracts);
				} else {
					console.log(res);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function deleteContract(contract) {
		const url = `${baseUrl}/api/contract/${contract["contract_id"]}`;
		axios
			.delete(url)
			.then((res) => {
				if(res.data.success) {
					console.log("Contract deleted");
					fetchContracts();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function applyToContract(contract) {
		const url = `${baseUrl}/api/developer/${authUser["username"]}/application`;
		const data = {};
		data["contract_id"] = contract.contract_id;
	
		axios
			.post(url, data)
			.then((res)=> {
				if(res.data.success){
					console.log("Successfully applied");
					fetchContracts();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	if (contractsData) {
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
	if(contractsData == undefined) {
		return <></>;
	}

	if (axiosUrl.indexOf("developer") > -1 || axiosUrl.indexOf("company") > -1) {
		return ( //Return small table version of contracts
			<>
				<Paper elevation={4}>
					<Table>
						<TableHead>
							<TableRow>
								{axiosUrl.indexOf("developer") > -1 && (
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
								{axiosUrl.indexOf("company") > -1 && (
									<TableCell/>
								) }
							</TableRow>
						</TableHead>
						<TableBody>
							{contractsData.map((contract) => (
								<TableRow key={contract.contract_id}>
									{axiosUrl.indexOf("developer") > -1 && (
										<TableCell>
											<Stack direction="row" spacing={1} alignItems="center" >
												<Avatar src={contract["company_avatar"] } sx={{ width: 24, height: 24 }}/>
												<Typography>{contract.company_name}</Typography>
											</Stack>
										</TableCell>
									)}
									<TableCell>
										{contract.title}
									</TableCell>
									<TableCell>
										{contract.value}
									</TableCell>
									<TableCell>
										{contract.length}
									</TableCell>
									{axiosUrl.indexOf(authUser["username"]) > -1 && axiosUrl.indexOf("company") > -1 && ( //If a company is viewing their own page
										<TableCell align="right"style={{ width: 128 }}>
											<Button size="small" variant="contained">
												View
											</Button>
											<Button color="error" size="small" onClick={() => deleteContract(contract)}>
												<DeleteIcon/>
											</Button>
										</TableCell>
									)}
									{authUser["userType"] == "developer" && axiosUrl.indexOf("company") > -1 && ( //If dev is viewing a company page
										<TableCell align="right">
											<Button size="small" variant="contained" onClick={() => applyToContract(contract)}>
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
		return ( //Return large card version of contracts
			<>
				<Stack spacing={2}>
					{contractsData.map((contract) => (
						<ContractCard key={contract.contract_id} contract={contract}>
						</ContractCard>
					))}
				</Stack>
			</>
		);
	}

}

export default ContractList;
