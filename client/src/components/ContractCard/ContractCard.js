import { Button, Chip, Divider, Grid, Stack } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import BusinessIcon from "@mui/icons-material/Business";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import LanguageList from "../LanguagesPicker/LanguageList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import React from "react";
import RouterIcon from "@mui/icons-material/Router";
import StyledLink from "../StyledLink";
import Typography from "@mui/material/Typography";
import { currencyFormatter } from "../../utils/utils";

const Label = ({ children }) => (
	<Typography variant="caption">{children}</Typography>
);

function ContractCard({
	contract,
	actions,
	onAction,
	noAvatar,
	enableLinkToApplicationPage,
}) {
	const company_name = contract.company_name;
	const avatarUrl = contract.company_avatar;
	const title = contract.title;
	const description = contract.description;
	const date_posted = contract.date_posted;
	const open = contract.open;
	const remote = contract.remote;
	const length = contract.length;
	const value = contract.value;
	const contract_id = contract.contract_id;
	const acceptedDeveloper = contract.username;
	const contractLanguageList = Object.keys(contract.contract_languages);

	console.log(acceptedDeveloper);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Card elevation={4}>
				{noAvatar ? (
					<CardHeader
						action={
							<IconButton onClick={handleMenu}>
								<MoreVertIcon />
							</IconButton>
						}
						title={
							enableLinkToApplicationPage ? (
								<StyledLink to={`/applications/${contract_id}`}>
									{title}
								</StyledLink>
							) : (
								<>{title}</>
							)
						}
						subheader={
							<StyledLink to={`/profile/company/${company_name}`}>
								{company_name}
							</StyledLink>
						}
					/>
				) : (
					<CardHeader
						avatar={
							<StyledLink to={`/profile/company/${company_name}`}>
								<Avatar src={noAvatar ? null : avatarUrl} />
							</StyledLink>
						}
						action={
							<IconButton onClick={handleMenu}>
								<MoreVertIcon />
							</IconButton>
						}
						title={
							enableLinkToApplicationPage ? (
								<StyledLink to={`/applications/${contract_id}`}>
									{title}
								</StyledLink>
							) : (
								<>{title}</>
							)
						}
						subheader={
							<StyledLink to={`/profile/company/${company_name}`}>
								{company_name}
							</StyledLink>
						}
					/>
				)}
				<Divider />
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography component="span" variant="caption" color="gray">
								{`Posted: ${date_posted}`}
							</Typography>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Label>Value:</Label>
							<Typography>{`${currencyFormatter.format(value)}`}</Typography>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Label>Duration:</Label>
							<Typography>{`${length} ${
								length == 1 ? "month" : "months"
							}`}</Typography>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Stack>
								<Label>Location:</Label>
								<Chip
									label={remote ? "Remote" : "In-Office"}
									color="info"
									icon={remote ? <RouterIcon /> : <BusinessIcon />}
									size="small"
								/>
							</Stack>
						</Grid>
						<Grid item xs={6} sm={3}>
							<Stack>
								<Label>Status:</Label>
								<Chip
									label={open ? "Open" : "Closed"}
									color={open ? "success" : "warning"}
									icon={open ? <PersonSearchIcon /> : <PersonOffIcon />}
									size="small"
								/>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Label>Description:</Label>
							<Typography>
								{description ? description : "No Description"}
							</Typography>
						</Grid>
						{contractLanguageList && (
							<Grid item xs={12}>
								<Label>Required Languages:</Label>
								<LanguageList
									languages={contractLanguageList}
									sx={{ mt: 1 }}
								/>
							</Grid>
						)}
						{acceptedDeveloper && (
							<Grid item xs={12}>
								<Label>Accepted Developer:</Label>
								<StyledLink to={`/profile/developer/${acceptedDeveloper}`}>
									<Typography>{acceptedDeveloper}</Typography>
								</StyledLink>
							</Grid>
						)}
					</Grid>
				</CardContent>
				<Divider />
				{actions.length > 0 && (
					<CardActions>
						{actions.map((action) => (
							<Button
								key={action}
								variant="contained"
								size="small"
								onClick={() => onAction(action)}
							>
								{action}
							</Button>
						))}
					</CardActions>
				)}
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
