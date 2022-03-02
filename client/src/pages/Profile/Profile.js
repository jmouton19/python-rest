import React, { useState } from "react";
import { useUserCredentials, useAuth } from "../../AuthProvider";
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
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormControl,
	FormHelperText,
	Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function Profile() {
	const auth = useAuth();
	const user = useUserCredentials();
	const [edit, setEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	const handleEditOpen = () => {
		setEdit(true);
	};

	const handleEditClose = () => {
		setEdit(false);
	};

	const handleConfirmDeleteOpen = () => {
		setConfirmDelete(true);
	};

	const handleConfirmDeleteClose = () => {
		setConfirmDelete(false);
	};

	return (
		<React.Fragment>
			{auth ? (
				<>
					<Fab
						style={fabStyle}
						color="primary"
						aria-label="edit"
						onClick={handleEditOpen}
					>
						<EditIcon />
					</Fab>
				</>
			) : null}
			<Dialog open={edit} onClose={handleEditClose}>
				<DialogTitle><u>Edit Details</u></DialogTitle>
				<Grid container padding={1} rowSpacing={3} alignItems="center">
					<Grid item xs={12}>
						<Grid container alignItems="center" padding={1} spacing={2}>
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
											defaultValue={user.username}
											label="Username"
										/>
										<TextField
											variant="outlined"
											defaultValue={user.firstName}
											label="First Name"
										/>
										<TextField
											variant="outlined"
											defaultValue={user.lastName}
											label="Last Name"
										/>
										<TextField 
											variant="outlined" 
											defaultValue={user.email}
											label="Email" 
										/>
										<Divider/>
										
									</Stack>
								) : (
									<Stack>
										<TextField
											variant="outlined"
											defaultValue={user.username}
										/>
										<TextField 
											variant="outlined" 
											defaultValue={user.email} 
										/>
										<TextField 
											variant="outlined" 
											defaultValue={user.industry}
											label="Industry" 
										/>
										<Divider />
									</Stack>
								)}
							</Grid>
							<Grid item xs={12} >
								<Stack spacing={1}>
									<FormControl fullWidth>
										<InputLabel htmlFor="password-input">
											New Password
										</InputLabel>
										<OutlinedInput
											id="password-input"
											type={showPassword ? "text" : "password"}
											name="password"
											autoComplete="new-password"
											onBlur={(event) => {
												setPassword(event.target.value);
											}}
											label="Password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														onClick={toggleShowPassword}
														onMouseDown={toggleShowPassword}
													>
														{showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel htmlFor="password-repeat-input">
											Repeat New Password
										</InputLabel>
										<OutlinedInput
											id="password-repeat-input"
											type={showPassword ? "text" : "password"}
											value={passwordRepeated}
											name="password"
											autoComplete="new-password"
											onChange={(event) => {
												setPasswordRepeated(event.target.value);
											}}
											label="Repeat Password"
											error={password !== passwordRepeated}
										/>
										{password !== passwordRepeated ? (
											<FormHelperText
												id="password-match-helper-text"
												sx={{
													color: "red",
												}}
											>
												Passwords do not match
											</FormHelperText>
										) : null}
									</FormControl>
									<Divider/>
								</Stack>
							</Grid>
						</Grid>
						<DialogActions>
							<Grid container justifyContent="space-between" alignItems="center" spacing={1}>
								<Grid item xs={9}>
									<FormControl fullWidth>
										<InputLabel htmlFor="password-repeat-input">
											Old Password
										</InputLabel>
										<OutlinedInput
											id="password-old-input"
											type={showPassword ? "text" : "password"}
											value={oldPassword}
											name="password"
											autoComplete="old-password"
											onChange={(event) => {
												setOldPassword(event.target.value);
											}}
											label="Old Password"
										/>
									</FormControl>
								</Grid>
								<Grid item xs={3}>
									<Stack direction="row" spacing= {1}>
										<Button 
											onClick={handleEditClose} 
											variant="contained"
											sx={ { borderRadius: "50%" } }
											//TODO:Add server communication and updating
										>
											<SaveIcon />
										</Button>
										<Button 
											onClick={handleConfirmDeleteOpen} 
											variant="contained"
											sx={ { borderRadius: "50%", height: 60} }
											color="error"
										>
											<DeleteIcon />
										</Button>
									</Stack>
								</Grid>
							</Grid>
						</DialogActions>
					</Grid>
				</Grid>
			</Dialog>
			<Dialog open={confirmDelete} onClose={handleConfirmDeleteClose}>
				<DialogTitle><u>Are you sure you want to delete your profile?</u></DialogTitle>
				<DialogActions>
					<FormControl fullWidth>
						<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="space-around">
							<Button
								variant="contained"
								onClick={handleConfirmDeleteClose}
								color="error"
								//TODO:Add server communication and updating
							>
								Confirm
							</Button>
							<Button
								variant="contained"
								onClick={handleConfirmDeleteClose}
								color="primary"
							>
								Cancel
							</Button>
						</Stack>
					</FormControl>
				</DialogActions>
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
