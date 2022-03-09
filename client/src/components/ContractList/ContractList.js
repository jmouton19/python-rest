import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
} from "../../utils/contractSorting";
import {  Avatar, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import axios from "axios";
import ContractCard from "../ContractCard/ContractCard";
import { useUser } from "../../AuthProvider";

function ContractList({ method, descending, axiosUrl, children }) {
	const [contractsData, setContractsData] = useState(null);
	const authUser = useUser();

	useEffect(() => {
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
	}, []);

	async function contractAction(contract){
		const baseUrl = "https://cs334proj1group8.herokuapp.com";
		if(authUser.userType == "developer") {
			//Apply to contract call if authUser developer
			const url = `${baseUrl}/api/developer/${authUser["username"]}/application/`;
			const data = {};
			data["contract_id"] = contract.contract_id;

			axios
				.post(url, data)
				.then((res)=> {
					if(res.data.success){
						console.log("Successfully applied");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (authUser.userType == "company"){
			//Delete or go to Applications if authUser company. Still need to figure out how to differentiate between clicks
			const url = `${baseUrl}/api/contract/${contract["contract_id"]}/`;
			axios
				.delete(url)
				.then((res) => {
					if(res.data.success) {
						console.log("Contract deleted");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
								{axiosUrl.indexOf("developer") > -1 ? (
									<TableCell>
										<b>Company</b>
									</TableCell>
								) : (<></>)}
								<TableCell>
									<b>Title</b>
								</TableCell>
								<TableCell>
									<b>Value</b>
								</TableCell>
								<TableCell>
									<b>Duration</b>
								</TableCell>
								{children != null ? (
									<TableCell align="right">
									</TableCell>
								) : null}
							</TableRow>
						</TableHead>
						<TableBody>
							{contractsData.map((contract) => (
								<TableRow key={contract.contract_id}>
									{axiosUrl.indexOf("developer") > -1 ? (
										<TableCell>
											<Stack direction="row" spacing={1} alignItems="center" >
												<Avatar src={contract["company_avatar"] } sx={{ width: 24, height: 24 }}/>
												<Typography>{contract.company_name}</Typography>
											</Stack>
										</TableCell>
									) : (<></>)}
									<TableCell>
										{contract.title}
									</TableCell>
									<TableCell>
										{contract.value}
									</TableCell>
									<TableCell>
										{contract.length}
									</TableCell>
									{children != null ? (
										<TableCell align="right" onClick={() => contractAction(contract)}>
											{children}
										</TableCell>
									) : null}
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
							<div onClick={() => contractAction(contract)}>
								{children}
							</div>
						</ContractCard>
					))}
				</Stack>
			</>
		);
	}

}

export default ContractList;
