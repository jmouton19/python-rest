import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import Container from "@mui/material/Container";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import axios from "axios";

// import { sampleData } from "./generateSampleData";
import ContractCard from "../../components/ContractCard/ContractCard";

function AvailableContracts() {
	const [contractsData, setContractsData] = useState([]);

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

	return (
		<>
			<Stack spacing={2}>
				{contractsData.map((contract) => (
					<ContractCard
						key={contract.contract_id}
						company_name={contract.company_name}
						avatarUrl={contract.company_avatar}
						title={contract.title}
						description={contract.description}
						date_posted={contract.date_posted}
						open={contract.open}
						remote={contract.remote}
						length={contract.length}
						value={contract.value}
					/>
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
							{/* <Tab label="Favorited" value="2" /> */}
							<Tab label="Applied" value="2" />
							<Tab label="Blocked" value="3" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<AvailableContracts />
					</TabPanel>
					<TabPanel value="2">Applied</TabPanel>
					<TabPanel value="3">Blocked</TabPanel>
				</TabContext>
			</Box>
		</Container>
	);
}

export default Contracts;
