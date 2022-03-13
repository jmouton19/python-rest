import { Box, Container, Stack, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import ContractList from "../../components/ContractList/ContractList";
import React from "react";
import SortPicker from "./SortPicker";
import { useUser } from "../../AuthProvider";

function Contracts() {
	const [activeTabNumber, setActiveTabNumber] = React.useState("1");
	const [sortMethod, setSortMethod] = React.useState("date");
	const [descending, setDescending] = React.useState(true);
	const authUser = useUser();

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
				{authUser.userType == "developer" ? "Contracts" : "My Contracts"}
			</Typography>

			<Box sx={{ width: "100%", typography: "body1" }}>
				{authUser.userType == "developer" ? (
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
								method={sortMethod}
								descending={descending}
								status="available"
								authUser={authUser}
							/>
						</TabPanel>
						<TabPanel value="2">
							<ContractList
								method={sortMethod}
								descending={descending}
								status="applied"
								authUser={authUser}
							/>
						</TabPanel>
						<TabPanel value="3">
							<ContractList
								method={sortMethod}
								descending={descending}
								status="accepted"
								authUser={authUser}
							/>
						</TabPanel>
					</TabContext>
				) : (
					<TabContext value={activeTabNumber}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Stack direction="row">
								<TabList
									onChange={handleTabChange}
									aria-label="lab API tabs example"
								>
									<Tab label="Open" value="1" />
									<Tab label="Closed" value="2" />
								</TabList>
								<SortPicker
									sx={{ marginLeft: "auto" }}
									onChange={handleSortChange}
								/>
							</Stack>
						</Box>
						<TabPanel value="1">
							<ContractList
								method={sortMethod}
								descending={descending}
								status="open"
								viewUser={authUser}
								authUser={authUser}
							/>
						</TabPanel>
						<TabPanel value="2">
							<ContractList
								method={sortMethod}
								descending={descending}
								status="closed"
								viewUser={authUser}
								authUser={authUser}
							/>
						</TabPanel>
					</TabContext>
				)}
			</Box>
		</Container>
	);
}

export default Contracts;
