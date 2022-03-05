import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
// import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { sampleData } from "./generateSampleData";
import { Divider } from "@mui/material";

function AvailableContracts() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Stack spacing={2}>
				{sampleData.map((dataItem) => (
					<Card key={dataItem.contract_id} elevation={2}>
						<CardHeader
							avatar={<Avatar aria-label={dataItem.company_name} />}
							action={
								<IconButton aria-label="settings" onClick={handleMenu}>
									<MoreVertIcon />
								</IconButton>
							}
							title={dataItem.company_name}
							subheader={dataItem.date_posted.toUTCString()}
						/>
						<Divider />
						<CardContent>
							<Typography component="span" variant="body2" color="text.primary">
								{`Duration: ${dataItem.length} Months`}
							</Typography>
							<br />
							<Typography component="span" variant="body2" color="text.primary">
								{`Value: $${dataItem.value}`}
							</Typography>
							<br />
							<Typography variant="body2" color="text.secondary">
								{dataItem.description}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							{/* <Tooltip title="Add to Favorites">
								<IconButton>
									<FavoriteIcon color="#ffffff" />
								</IconButton>
							</Tooltip> */}
							<Button variant="grey">Apply Now</Button>
						</CardActions>
					</Card>
				))}
			</Stack>

			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem to="/login" onClick={handleMenuClose}>
					Block this company
				</MenuItem>
			</Menu>
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
