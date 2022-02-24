import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth = 240;

export default function PrimarySearchAppBar() {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	

	return (
		<React.Fragment>
			<AppBar position="static" >
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
					>
						ZenOffer
					</Typography>
					<Box sx={{flexGrow: 1}}/>
					<Box>
						<Button component={Link} to="/" color="inherit" >
							Home
						</Button>
						<Button component={Link} to="/contracts" color="inherit" >
							Contracts
						</Button>
						<Button component={Link} to="/about" color="inherit">
							About
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />  
				</IconButton>
				<Divider />
			</Drawer>
		</React.Fragment>
	);
}
