import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Chip, Container, Divider, Stack } from "@mui/material";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import BusinessIcon from "@mui/icons-material/Business";
import RouterIcon from "@mui/icons-material/Router";
import { Link } from "react-router-dom";

const Label = ({ children }) => (
	<Typography variant="caption">{children}</Typography>
);

function ContractCard({ contract }) {
	const company_name = contract.company_name;
	const avatarUrl = contract.company_avatar;
	const title = contract.title;
	const description = contract.description;
	const date_posted = contract.date_posted;
	const open = contract.open;
	const remote = contract.remote;
	const length = contract.length;
	const value = contract.value;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Card elevation={2}>
				<CardHeader
					avatar={
						<Link to={`/profile/company/${company_name}`}>
							<Avatar src={avatarUrl} />
						</Link>
					}
					action={
						<IconButton onClick={handleMenu}>
							<MoreVertIcon />
						</IconButton>
					}
					title={title}
					subheader={
						<Link to={`/profile/company/${company_name}`}>{company_name}</Link>
					}
				/>
				<Divider />
				<CardContent>
					<Stack spacing={0.5}>
						<Typography component="span" variant="caption" color="gray">
							{`Posted: ${date_posted}`}
						</Typography>
						<Stack direction="row" spacing={1}>
							<Container>
								<Label>Duration</Label>
								<Typography>{`${length} ${
									length == 1 ? "month" : "months"
								}`}</Typography>
							</Container>
							<Container>
								<Label>Value</Label>
								<Typography>{`$ ${value}`}</Typography>
							</Container>
						</Stack>
						<Container>
							<Label>Description</Label>
							<Typography>
								{description ? description : "No Description"}
							</Typography>
						</Container>
						<Container>
							<Stack spacing={1} direction="row">
								<Chip
									label={open ? "Looking For Applicants" : "Closed"}
									color={open ? "success" : "info"}
									icon={open ? <PersonSearchIcon /> : <PersonOffIcon />}
									size="small"
								/>
								<Chip
									label={remote ? "Remote" : "In-Office"}
									color="info"
									icon={remote ? <RouterIcon /> : <BusinessIcon />}
									size="small"
								/>
							</Stack>
						</Container>
					</Stack>
				</CardContent>
				<Divider />
				<CardActions disableSpacing>
					<Button variant="grey">Apply Now</Button>
				</CardActions>
			</Card>
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
					Block {company_name}
				</MenuItem>
			</Menu>
		</>
	);
}

export default ContractCard;
