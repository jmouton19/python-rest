import React, { useState, useEffect } from "react";
import axios from "axios";
import ContractCard from "../../components/ContractCard/ContractCard";
import { Typography, Stack, Box, Tab, Container } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

function ContractsList() {
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

function Contracts() {
	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container maxWidth="md">
			<Typography variant="h3" color="primary" align="center" marginTop={3}>
				Contracts
			</Typography>

			<Box sx={{ width: "100%", typography: "body1" }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Available" value="1" />
							<Tab label="Applied" value="2" />
							<Tab label="Blocked" value="3" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<ContractsList />
					</TabPanel>
					<TabPanel value="2">
						<ContractsList />
					</TabPanel>
					<TabPanel value="3">
						<ContractsList />
					</TabPanel>
				</TabContext>
			</Box>
		</Container>
	);
}

export default Contracts;
