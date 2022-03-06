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
import { Chip, Divider, Stack, TextField } from "@mui/material";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import BusinessIcon from "@mui/icons-material/Business";
import RouterIcon from "@mui/icons-material/Router";

function ContractCard({
	company_name,
	avatarUrl,
	title,
	description,
	date_posted,
	open,
	remote,
	length,
	value,
}) {
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
					avatar={<Avatar aria-label={company_name} src={avatarUrl} />}
					action={
						<IconButton aria-label="settings" onClick={handleMenu}>
							<MoreVertIcon />
						</IconButton>
					}
					title={title}
					subheader={company_name}
				/>
				<Divider />
				<CardContent>
					<Stack spacing={2}>
						<Stack direction="row" spacing={1}>
							<TextField
								label="Duration"
								value={`${length} ${length == 1 ? "month" : "months"}`}
								variant="outlined"
								size="small"
								fullWidth
							/>
							<TextField
								label="Value"
								value={`$ ${value}`}
								variant="outlined"
								size="small"
								fullWidth
							/>
						</Stack>
						<TextField
							fullWidth
							label="Description"
							value={description}
							variant="outlined"
							size="small"
							minRows={2}
							multiline={true}
						/>

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
					</Stack>

					<Typography component="span" variant="caption" color="gray">
						{`Posted: ${date_posted}`}
					</Typography>
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
