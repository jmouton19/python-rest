import React, { useEffect, useState } from "react";
import { useUser, useLoadUserProfile } from "../../AuthProvider";
import axios from "axios";

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
	Grid,
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
	const loadUserProfile = useLoadUserProfile();
	const [edit, setEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [changePassword, setChangePassword] = useState(false);

	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [oldPassword, setOldPassword] = useState("");

	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [industry, setIndustry] = useState("");
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [programmingLanguages, setProgrammingLanguages] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setUsername(user["username"]);
		setAvatarUrl(user["avatarUrl"]);

		if (user["userType"] == "developer") {
			setFirstName(user["firstName"]);
			setLastName(user["lastName"]);
			setProgrammingLanguages(user["programmingLanguages"]);
		} else {
			setIndustry(user["industry"]);
		}
	}, [edit]);

	function deepEqual(object1, object2) {
		const keys1 = Object.keys(object1);
		const keys2 = Object.keys(object2);
		if (keys1.length !== keys2.length) {
			return false;
		}
		for (const key of keys1) {
			const val1 = object1[key];
			const val2 = object2[key];
			const areObjects = isObject(val1) && isObject(val2);
			if (
				(areObjects && !deepEqual(val1, val2)) ||
				(!areObjects && val1 !== val2)
			) {
				return false;
			}
		}
		return true;
	}
	function isObject(object) {
		return object != null && typeof object === "object";
	}

	function saveEditDisableChecks() {
		if (user["userType"] == "developer") {
			if (
				user["username"] != username ||
				user["firstName"] != firstName ||
				user["lastName"] != lastName ||
				user["avatarUrl"] != avatarUrl ||
				!deepEqual(user["programmingLanguages"], programmingLanguages)
			) {
				return false;
			} else {
				return true;
			}
		} else {
			if (user["username"] != username || user["industry"] != industry) {
				return false;
			} else {
				return true;
			}
		}
	}

	function saveDeleteDisableChecks() {
		return(
			password == "" 
		);
	}
	
	function saveChangePasswordChecks() {
		return(
			password == "" ||
			oldPassword == "" ||
			passwordRepeated == "" ||
			password != passwordRepeated
		);
	}

	function saveChangedDetails(changePasswordRoute) {
		const baseUrl = "https://cs334proj1group8.herokuapp.com";

		const url = `${baseUrl}/api/${user["userType"]}`;
		let data = {};
		if (changePasswordRoute) {
			data =
				user["userType"] == "developer"
					? {
						developerID: user["developerID"],
						oldPassword: oldPassword,
						newPassword: password,
					}
					: {
						companyID: user["companyID"],
						oldPassword: oldPassword,
						newPassword: password,
					};
		} else {
			data =
				user["userType"] == "developer"
					? {
						developerID: user["developerID"],
						...(user["username"] != username && { username: username }),
						...(user["firstName"] != firstName && { firstName: firstName }),
						...(user["lastName"] != lastName && { lastName: lastName }),
						...(user["avatarUrl"] != avatarUrl && { avatarUrl: avatarUrl }),
						...(!deepEqual(
							user["programmingLanguages"],
							programmingLanguages
						) && {
							programmingLanguages: programmingLanguages,
						}),
					}
					: {
						companyID: user["companyID"],
						...(user["industry"] != industry && { industry: industry }),
					};
		}
		axios
			.put(url, data)
			.then((res) => {
				if (res.data.success) {
					console.log("Details have been updated.");
					loadUserProfile(user["userType"], user["username"]);
					if (!changePasswordRoute) {
						setEdit(false);
					}
					setChangePassword(false);
					return true;
				}
			})
			.catch((err) => {
				console.log(err);
			});
		return false;
	}

	return (
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
									<AvatarPicker
										setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
									/>
								</Stack>
							</Grid>
							<Grid item xs={12}>
								{user.userType === "developer" ? (
									<Stack spacing={1}>
										<TextField
											variant="outlined"
											defaultValue={username}
											onChange={(event) => {
												setUsername(event.target.value);
											}}
											label="Username"
										/>
										<TextField
											variant="outlined"
											defaultValue={firstName}
											onChange={(event) => {
												setFirstName(event.target.value);
											}}
											label="First Name"
										/>
										<TextField
											variant="outlined"
											defaultValue={lastName}
											onChange={(event) => {
												setLastName(event.target.value);
											}}
											label="Last Name"
										/>
										<Divider />
										<LanguagesPicker
											presetLanguages={programmingLanguages}
											setLanguagesCallback={(languages) =>
												setProgrammingLanguages(languages)
											}
										/>
										<Divider />
									</Stack>
								) : (
									<Stack spacing={1}>
										<TextField
											variant="outlined"
											defaultValue={username}
											onChange={(event) => {
												setUsername(event.target.value);
											}}
											s
											label="Username"
										/>
										<TextField
											variant="outlined"
											defaultValue={industry}
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
										onClick={() => saveChangedDetails(false)}
										variant="contained"
										sx={{ borderRadius: "50%" }}
										disabled={saveEditDisableChecks()}
									>
										<SaveIcon />
									</Button>
								</Stack>
							</FormControl>
						</DialogActions>
					</Grid>
				</Grid>
			</Dialog>
			<Dialog
				open={changePassword}
				onClose={() => setChangePassword(false)}
				fullWidth
			>
				<DialogTitle>Change Password</DialogTitle>
				<FormControl fullWidth>
					<Stack padding={1} spacing={1}>
						<FormControl fullWidth>
							<InputLabel htmlFor="password-input">New Password</InputLabel>
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
						<FormControl fullWidth>
							<InputLabel htmlFor="password-old">Old Password</InputLabel>
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
						<Divider />
					</Stack>
				</FormControl>
				<DialogActions>
					<FormControl fullWidth>
						<Stack direction="row" justifyContent="space-between">
							<Button type="text" onClick={() => setChangePassword(false)}>
								Cancel
							</Button>
							<Button
								onClick={() => saveChangedDetails(true)}
								variant="contained"
								sx={{ borderRadius: "50%", height: 60, width: 60 }}
								disabled= {saveChangePasswordChecks()}
								//TODO:Add server communication and updating
							>
								<SaveIcon />
							</Button>
						</Stack>
					</FormControl>
				</DialogActions>
			</Dialog>
			<Dialog
				open={confirmDelete}
				onClose={() => setConfirmDelete(false)}
				fullWidth
			>
				<DialogTitle>Enter your password to confirm deletion</DialogTitle>
				<Stack padding={1}>
					<FormControl fullWidth>
						<InputLabel htmlFor="password-input">Password</InputLabel>
						<OutlinedInput
							id="password-input"
							type={showPassword ? "text" : "password"}
							name="password"
							autoComplete="new-password"
							onChange={(event) => {
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
				</Stack>
				<DialogActions>
					<FormControl fullWidth>
						<Stack direction="row" justifyContent="space-between">
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
								disabled={saveDeleteDisableChecks()}
								sx={{ borderRadius: "50%", height: 60, width: 60 }}
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
