import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";


export default function PrimarySearchAppBar() {
	return (
		<React.Fragment>
			<AppBar position="static" >
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
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
		</React.Fragment>
	);
}
