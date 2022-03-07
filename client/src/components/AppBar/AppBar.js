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
import { Avatar, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useUser, useLogout } from "../../AuthProvider";

const drawerWidth = 240;

export default function PrimarySearchAppBar() {
	const logout = useLogout();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const user = useUser();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const DrawerHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		backgroundColor: theme.palette.primary.main,
		minHeight: "63px",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	}));

	return (
		<React.Fragment>
			<AppBar position="static">
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
					<Box sx={{ flexGrow: 1 }} />
					<Typography variant="h6" component="div">
						<b>KONTRA</b>
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<Avatar
							src={
								user
									? user.avatarUrl
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
							}
						></Avatar>
					</IconButton>

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
						{user ? (
							<div>
								<MenuItem
									component={Link}
									to={`/profile/${user.userType}/${user.username}`}
									onClick={handleMenuClose}
								>
									My Profile
								</MenuItem>
								<MenuItem onClick={handleMenuClose}>My Contracts</MenuItem>
								{user.userType == "company" ? (
									<MenuItem
										component={Link}
										to="/addcontract"
										onClick={handleMenuClose}
									>
										Add a Contract
									</MenuItem>
								) : null}
								<MenuItem
									onClick={(handleMenuClose, logout)}
									component={Link}
									to="/"
								>
									Logout
								</MenuItem>
							</div>
						) : (
							<div>
								<MenuItem
									component={Link}
									to="/login"
									onClick={handleMenuClose}
								>
									Login
								</MenuItem>
								<MenuItem
									component={Link}
									to="/signup"
									onClick={handleMenuClose}
								>
									Sign Up
								</MenuItem>
							</div>
						)}
					</Menu>
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
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<Stack spacing={2} alignItems="stretch" color="inherit">
					<Button
						component={Link}
						to="/"
						color="inherit"
						style={{ minHeight: "63px" }}
					>
						<b>Home</b>
					</Button>
					<Button
						component={Link}
						to="/contracts"
						color="inherit"
						style={{ minHeight: "63px" }}
					>
						<b>Contracts</b>
					</Button>
					<Button
						component={Link}
						to="/about"
						color="inherit"
						style={{ minHeight: "63px" }}
					>
						<b>About</b>
					</Button>
				</Stack>
			</Drawer>
		</React.Fragment>
	);
}
