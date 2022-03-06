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
import { Divider } from "@mui/material";

function ContractCard({
	company_name,
	description,
	date_posted,
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
					avatar={<Avatar aria-label={company_name} />}
					action={
						<IconButton aria-label="settings" onClick={handleMenu}>
							<MoreVertIcon />
						</IconButton>
					}
					title={company_name}
					subheader={date_posted}
				/>
				<Divider />
				<CardContent>
					<Typography component="span" variant="body2" color="text.primary">
						{`Duration: ${length} Months`}
					</Typography>
					<br />
					<Typography component="span" variant="body2" color="text.primary">
						{`Value: $${value}`}
					</Typography>
					<br />
					<Typography variant="body2" color="text.secondary">
						{description}
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

export default ContractCard;
