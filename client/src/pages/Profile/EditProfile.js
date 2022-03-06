import React, { useState } from "react";
import { useUser } from "../../AuthProvider";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Fab,
	TextField,
	FormControl,
	Divider,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormHelperText,
	Stack,
	Grid
} from "@mui/material";

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function EditProfile() {
	const user = useUser();
	const [edit, setEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [changePassword, setChangePassword] = useState(false);

	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [oldPassword, setOldPassword] = useState("");

	const [, setUsername] = useState("");
	const [, setFirstName] = useState("");
	const [, setLastName] = useState("");
	const [, setIndustry] = useState("");
	const [, setAvatarUrl] = useState(null);
	const [, setProgrammingLanguages] = useState({});

	const [showPassword, setShowPassword] = useState(false);

	return(
		<>
			<Fab
				style={fabStyle}
				color="primary"
				aria-label="edit"
				onClick={() => setEdit(true)}
			>
				<EditIcon />
			</Fab>
			<Dialog open={edit} onClose={() => setEdit(false)}>
				<DialogTitle>
					<u>Edit Details</u>
				</DialogTitle>
				<Grid container padding={1} rowSpacing={3} alignItems="center">
					<Grid item xs={12}>
						<Grid container alignItems="center" padding={1} spacing={2}>
							<Grid item xs={12}>
								<Stack>
									<AvatarPicker setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)} />
								</Stack>
							</Grid>
							<Grid item xs={12}>
								{user.userType === "developer" ? (
									<Stack spacing={1}>
										<TextField
											variant="outlined"
											defaultValue={user.username}
											onChange={(event) => {
												setUsername(event.target.value);
											}}
											label="Username"
										/>
										<TextField
											variant="outlined"
											defaultValue={user.firstName}
											onChange={(event) => {
												setFirstName(event.target.value);
											}}
											label="First Name"
										/>
										<TextField
											variant="outlined"
											defaultValue={user.lastName}
											onChange={(event) => {
												setLastName(event.target.value);
											}}
											label="Last Name"
										/>
										<Divider />
										<LanguagesPicker
											presetLanguages={user.programmingLanguages}
											setLanguagesCallback={(languages) =>
												setProgrammingLanguages(languages)
											}
										/>
										<Divider />
									</Stack>
								) : (
									<Stack spacing = {1}>
										<TextField
											variant="outlined"
											defaultValue={user.username}
											onChange={(event) => {
												setUsername(event.target.value);
											}}s
											label="Username"
										/>
										<TextField
											variant="outlined"
											defaultValue={user.industry}
											onChange={(event) => {
												setIndustry(event.target.value);
											}}
											label="Industry"
										/>
										<Divider />
									</Stack>
								)}
							</Grid>
						</Grid>
						<DialogActions>
							<FormControl fullWidth>
								<Stack direction="row" justifyContent="space-between">
									<Stack>
										<Button
											onClick={() => setChangePassword(true)}
											variant="text"
											size="small"
										>
											Change password
										</Button>
										<Button
											onClick={() => setConfirmDelete(true)}
											variant="text"
											size="small"
											color="error"
										>
											Delete account
										</Button>
									</Stack>
									<Button
										onClick={() => setEdit(false)}
										variant="contained"
										sx={{ borderRadius: "50%" }}
										//TODO:Add server communication and updating
									>
										<SaveIcon />
									</Button>
								</Stack>	
							</FormControl>
						</DialogActions>
					</Grid>
				</Grid>
			</Dialog>
			<Dialog open={changePassword} onClose={() => setChangePassword(false)}>
				<DialogTitle>
					Change Password
				</DialogTitle>
				<Grid container padding={1} rowSpacing={3} alignItems="center">
					<Grid item xs={12}>
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
												onClick={() => setShowPassword(!showPassword)}
												onMouseDown={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
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
							<Divider />
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel htmlFor="password-old">
										Old Password
									</InputLabel>
									<OutlinedInput
										id="password-old-input"
										type={showPassword ? "text" : "password"}
										value={oldPassword}
										name="old-password"
										onChange={(event) => {
											setOldPassword(event.target.value);
										}}
										label="Old Password"
									/>
								</FormControl>
							</Grid>
							<Divider />
						</Stack>
					</Grid>
				</Grid>
				<DialogActions>
					<FormControl fullWidth>
						<Stack direction="row" justifyContent="space-between">
							<Button
								type="text"
								onClick={() => setChangePassword(false)}
							>
								Cancel
							</Button>
							<Button
								onClick={() => setChangePassword(false)}
								variant="contained"
								sx={{borderRadius: "50%", height: 60,}}
								//TODO:Add server communication and updating
							>
								<SaveIcon />
							</Button>
						</Stack>
					</FormControl>
				</DialogActions>
			</Dialog>
			<Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
				<DialogTitle>
					Enter your password to confirm deletion
				</DialogTitle>
				<FormControl fullWidth>
					<Stack padding={1}>
						<InputLabel htmlFor="password-old">
							Old Password
						</InputLabel>
						<OutlinedInput
							id="password-old-input"
							type={showPassword ? "text" : "password"}
							value={oldPassword}
							name="password"
							onChange={(event) => {
								setOldPassword(event.target.value);
							}}
							label="Old Password"
						/>
					</Stack>
				</FormControl>
				<DialogActions>
					<FormControl fullWidth>
						<Stack
							direction="row"
							justifyContent="space-between"
						>
							<Button
								variant="text"
								onClick={() => setConfirmDelete(false)}
								color="primary"
							>
								Cancel
							</Button>
							<Button
								//TODO: add delete post
								variant="contained"
								sx={{ borderRadius: "50%", height: 60 }}
								color="error"
							>
								<DeleteIcon />
							</Button>
						</Stack>
					</FormControl>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default EditProfile;