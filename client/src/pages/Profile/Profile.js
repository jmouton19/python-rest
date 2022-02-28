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
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
			</Dialog>
			<Container minWidth="md">
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={4}>
						<Paper elevation={4}>
							<Grid container alignItems="center"  padding={2} justifyContent="space-between">
								<Grid item >
									<Avatar
										sx={{ width: 100, height: 100 }}
										src={user.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item >
									{user.userType === "developer" ? (
										<Stack>
											<Typography variant="h3">
												{user.firstName} {user.lastName}
											</Typography>
											<Typography variant="h5">{user.username}</Typography>
											<Typography variant="h6">{user.email}</Typography>
										</Stack>
									) : (
										<Stack>
											<Typography variant="h3">{user.username}</Typography>
											<Typography variant="h6">{user.email}</Typography>
										</Stack>
									)}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={8}>
						<Paper elevation={4}>
							{user.userType === "developer" ? ( //Table for developer experience
								<TableContainer>
									<Table >
										<TableHead>
											<TableRow>
												<TableCell colSpan={2}>
													<Typography variant="h5">
														Experience
													</Typography>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													<Typography variant="h6">
														Programming Languages
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="h6">
														Months
													</Typography>
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>

										</TableBody>
									</Table>
								</TableContainer>
							) : ( //random stuff for company? maybe money too
								<div>Test</div>	
							)}
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Profile;
