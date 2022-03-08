import React from "react";
import { Typography, Stack, Box, Tab, Container, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SortPicker from "./SortPicker";
import ContractList from "../../components/ContractList/ContractList";

function Contracts() {
	const [activeTabNumber, setActiveTabNumber] = React.useState("1");
	const [sortMethod, setSortMethod] = React.useState("date");
	const [descending, setDescending] = React.useState(true);

	const handleTabChange = (event, newValue) => {
		setActiveTabNumber(newValue);
	};

	const handleSortChange = (method, descending) => {
		setSortMethod(method);
		setDescending(descending);
	};

	return (
		<Container maxWidth="md">
			<Typography variant="h3" color="primary" align="center" marginTop={3}>
				Contracts
			</Typography>

			<Box sx={{ width: "100%", typography: "body1" }}>
				<TabContext value={activeTabNumber}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Stack direction="row">
							<TabList
								onChange={handleTabChange}
								aria-label="lab API tabs example"
							>
								<Tab label="Available" value="1" />
								<Tab label="Applied" value="2" />
								<Tab label="Accepted" value="3" />
							</TabList>
							<SortPicker
								sx={{ marginLeft: "auto" }}
								onChange={handleSortChange}
							/>
						</Stack>
					</Box>
					<TabPanel value="1">
						<ContractList
							axiosUrl={"https://cs334proj1group8.herokuapp.com/api/contract"}
							method={sortMethod}
							condensed={false}
							descending={descending}
						>
							<Button variant="grey">Apply Now</Button>
						</ContractList>
					</TabPanel>
					<TabPanel value="2">
						<ContractList
							axiosUrl={"https://cs334proj1group8.herokuapp.com/api/contract"}
							method={sortMethod}
							condensed={false}
							descending={descending}
						>
							<Button variant="grey">Apply Now</Button>
						</ContractList>
					</TabPanel>
					<TabPanel value="3">
						<ContractList
							axiosUrl={"https://cs334proj1group8.herokuapp.com/api/contract"}
							method={sortMethod}
							condensed={false}
							descending={descending}
						>
							<Button variant="grey">Apply Now</Button>
						</ContractList>
					</TabPanel>
				</TabContext>
			</Box>
		</Container>
	);
}

export default Contracts;
