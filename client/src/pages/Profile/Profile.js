import React, { useState } from "react";
import { useUserCredentials } from "../../AuthProvider";
import Grid from "@mui/material/Grid";
import {
	Avatar,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Fab,
	Paper,
	Stack,
	Step,
	Stepper,
	StepButton,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AvatarPicker from "../SignUp/AvatarPicker";

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function Profile() {
	const user = useUserCredentials();
	const [edit, setEdit] = useState(false);
	const [activeStep, setActiveStep] = useState(1);

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleEditOpen = () => {
		setEdit(true);
	};

	const handleEditClose = () => {
		setEdit(false);
	};

	return (
		<React.Fragment>
			<Fab
				style={fabStyle}
				color="primary"
				aria-label="edit"
				onClick={handleEditOpen}
			>
				<EditIcon />
			</Fab>
			<Dialog open={edit} onClose={handleEditClose}>
				<DialogTitle>Edit Details</DialogTitle>
				<Stepper nonLinear activeStep={activeStep}>
					<Step>
						<StepButton color="inherit" onClick={handleStep(1)}>
							General Info
						</StepButton>
						<Grid container padding={1} rowSpacing={3} alignItems="center">
							<Grid item xs={12}>
								<Grid container alignItems="center" padding={1} spacing={1}>
									<Grid item xs={12}>
										<Stack>
											<AvatarPicker
												setAvatarUrl={(imageUrl) => user.setAvatarUrl(imageUrl)}
											/>
										</Stack>
									</Grid>
									<Grid item xs={12}>
										{user.userType === "developer" ? (
											<Stack spacing={1}>
												<TextField
													variant="outlined"
													defaultValue={user.firstName}
												/>
												<TextField
													variant="outlined"
													defaultValue={user.lastName}
												/>
												<TextField
													variant="outlined"
													defaultValue={user.username}
												/>
												<TextField variant="outlined" defaultValue={user.email} />
											</Stack>
										) : (
											<Stack>
												<TextField
													variant="outlined"
													defaultValue={user.username}
												/>
												<TextField variant="outlined" defaultValue={user.email} />
											</Stack>
										)}
									</Grid>
								</Grid>
								<DialogActions>
									<Button 
										onClick={handleEditClose} 
										variant="contained"
										//TODO:Add server communication and updating
									>
										Save Changes
									</Button>
								</DialogActions>
							</Grid>
						</Grid>
					</Step>
					<Step>
						<StepButton color="inherit" onClick={handleStep(2)}>
							Additional Information
						</StepButton>
					</Step>
				</Stepper>
			</Dialog>
			<Container maxWidth="md">
				<Grid container padding={1} rowSpacing={3} alignItems="center">
					<Grid item xs={12}>
						<Paper elevation={4}>
							<Grid container alignItems="center" padding={2}>
								<Grid item xs={3}>
									<Avatar
										sx={{ width: 100, height: 100 }}
										src={user.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item xs={9} spacing={8}>
									<Stack>
										{user.userType === "developer" ? (
											<div>
												<Typography variant="h3">
													{user.firstName} {user.lastName}
												</Typography>
												<Typography variant="h5">{user.username}</Typography>
												<Typography variant="h6">{user.email}</Typography>
											</div>
										) : (
											<div>
												<Typography variant="h3">{user.username}</Typography>
												<Typography variant="h6">{user.email}</Typography>
											</div>
										)}
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Profile;
