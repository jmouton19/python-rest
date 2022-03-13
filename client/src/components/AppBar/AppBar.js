import { Avatar, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useLogin, useLogout, useUser } from "../../AuthProvider";

import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import BusinessIcon from "@mui/icons-material/Business";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import { Search } from "../searchbar";
import SearchIcon from "@mui/icons-material/Search";
import { SearchIconWrapper } from "../searchbar";
import SearchMenu from "./SearchMenu";
import { StyledInputBase } from "../searchbar";
import StyledLink from "../StyledLink";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../logo.svg";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

export default function PrimarySearchAppBar() {
	const logout = useLogout();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
	const [searchValue, setSearchValue] = useState("");

	const sampleLogin = useLogin();
	const authUser = useUser();

	const [searchMenuOpen, setSearchMenuOpen] = useState(false);

	let URLToProfile;
	if (authUser) {
		URLToProfile = `./profile/${authUser.userType}/${authUser.username}`;
	} else {
		URLToProfile = "/signUp";
	}

	const handleMenu = (event) => {
		setUserMenuAnchorEl(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setUserMenuAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setUserMenuOpen(true);
	};

	const handleDrawerClose = () => {
		setUserMenuOpen(false);
	};

	const DrawerHeader = styled("div")(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		backgroundColor: "primary",
		minHeight: "63px",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	}));

	return (
		<React.Fragment>
			<SearchMenu searchValue={searchValue} open={searchMenuOpen} />
			<AppBar position="static" sx={{ backgroundColor: "primary" }}>
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
					<ToggleButtonGroup>
						<ToggleButton
							value="left"
							onClick={() => sampleLogin("admin@disney.com", "12341234")}
						>
							<BusinessIcon />
						</ToggleButton>
						<ToggleButton
							value="center"
							onClick={() => sampleLogin("nicolvisser@yahoo.com", "12341234")}
						>
							<PersonIcon />
						</ToggleButton>
					</ToggleButtonGroup>
					<Box sx={{ flexGrow: 3 }} />
					<img src={logo} style={{ width: 25, height: 25, marginRight: 10 }} />
					<StyledLink to="/">
						<Typography variant="h6" component="div">
							<b>KONTRA</b>
						</Typography>
					</StyledLink>
					<Box sx={{ flexGrow: 2 }} />
					<Search
						onChange={(event) => {
							setSearchValue(event.target.value);
							if (event.target.value !== "") {
								setSearchMenuOpen(true);
							} else {
								setSearchMenuOpen(false);
							}
						}}
						onFocus={(event) => {
							if (event.target.value !== "") {
								setSearchMenuOpen(true);
							} else {
								setSearchMenuOpen(false);
							}
						}}
						onBlur={() => {
							setTimeout(() => {
								// wait a little bit before closing menu to allow focus to go to search results
								setSearchMenuOpen(false);
							}, 200);
						}}
					>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" />
					</Search>
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
								authUser
									? authUser.avatarUrl
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
							}
						></Avatar>
					</IconButton>

					<Menu
						id="menu-appbar"
						anchorEl={userMenuAnchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(userMenuAnchorEl)}
						onClose={handleUserMenuClose}
					>
						{authUser ? (
							<div>
								<MenuItem
									component={Link}
									to={`/profile/${authUser.userType}/${authUser.username}`}
									onClick={handleUserMenuClose}
								>
									My Profile
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleUserMenuClose();
										logout();
									}}
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
									onClick={handleUserMenuClose}
								>
									Login
								</MenuItem>
								<MenuItem
									component={Link}
									to="/signup"
									onClick={handleUserMenuClose}
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
				anchor="left"
				open={userMenuOpen}
				onClose={handleDrawerClose}
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
						onClick={handleDrawerClose}
						style={{ minHeight: "63px" }}
					>
						<b>Home</b>
					</Button>
					<Button
						component={Link}
						to="/contracts"
						color="inherit"
						onClick={handleDrawerClose}
						style={{ minHeight: "63px" }}
					>
						<b>Contracts</b>
					</Button>
					<Button
						component={Link}
						to={URLToProfile}
						color="inherit"
						onClick={handleDrawerClose}
						style={{ minHeight: "63px" }}
					>
						<b>My Profile</b>
					</Button>
				</Stack>
			</Drawer>
		</React.Fragment>
	);
}
