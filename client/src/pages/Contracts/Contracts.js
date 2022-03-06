import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import Container from "@mui/material/Container";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { sampleData } from "./generateSampleData";
import ContractCard from "../../components/ContractCard/ContractCard";

function AvailableContracts() {
	return (
		<>
			<Stack spacing={2}>
				{sampleData.map((dataItem) => (
					<ContractCard
						key={dataItem.company_name}
						company_name={dataItem.company_name}
						description={dataItem.description}
						date_posted={dataItem.date_posted.toUTCString()}
						length={dataItem.length}
						value={dataItem.value}
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
