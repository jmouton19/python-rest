import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
} from "../../utils/contractSorting";
import {  Avatar, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import axios from "axios";
import ContractCard from "../ContractCard/ContractCard";

function ContractList({ method, descending, axiosUrl, condensed, children }) {
	const [contractsData, setContractsData] = useState(null);

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

	if (condensed == true) {
		return (
			<>
				<Paper elevation={4}>
					<Table>
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
										<TableCell align="right">
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
		return (
			<>
				<Stack spacing={2}>
					{contractsData.map((contract) => (
						<ContractCard key={contract.contract_id} contract={contract}>
							{children}
						</ContractCard>
					))}
				</Stack>
			</>
		);
	}

}

export default ContractList;
