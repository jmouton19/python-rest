import React, { useState, useEffect } from "react";
import {
	sortByValue,
	sortByDuration,
	sortByDate,
} from "../../utils/contractSorting";
import { Stack } from "@mui/material";
import LoadingPage from "../LoadingPage/LoadingPage";
import axios from "axios";
import ContractCard from "../ContractCard/ContractCard";

function ContractList({ method, descending }) {
	const [contractsData, setContractsData] = useState(null);

	useEffect(() => {
		axios
			.get("https://cs334proj1group8.herokuapp.com/api/contract")
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

	return (
		<>
			<Stack spacing={2}>
				{contractsData.map((contract) => (
					<ContractCard key={contract.contract_id} contract={contract} />
				))}
			</Stack>
		</>
	);
}

export default ContractList;
