import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	Fab,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteUser, updateUser } from "../../utils/apiCalls";
import {
	useLoadUserProfile,
	useLogin,
	useLogout,
	useUser,
} from "../../AuthProvider";

import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { deepEqual } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useNotifySuccess, useNotifyError } from "../../NotificationProvider";

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
	const notifySuccess = useNotifySuccess();
	const notifyError = useNotifyError();
	//const loadUserProfile = useLoadUserProfile();
	const login = useLogin();
	const logout = useLogout();
	const navigate = useNavigate();
	const loadUserProfile = useLoadUserProfile();
	const [edit, setEdit] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [changePassword, setChangePassword] = useState(false);

	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [email, setEmail] = useState("");

	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [surname, setLastName] = useState("");
	const [industry, setIndustry] = useState("");
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [programmingLanguages, setProgrammingLanguages] = useState({});
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setUsername(user["username"]);
		setAvatarUrl(user["avatarUrl"]);

		if (user["userType"] == "developer") {
			setName(user["firstName"]);
			setLastName(user["lastName"]);
			setProgrammingLanguages(user["programmingLanguages"]);
		} else {
			setIndustry(user["industry"]);
		}
	}, [edit, user]);

	function saveEditDisableChecks() {
		if (user["userType"] == "developer") {
			if (
				user["username"] != username ||
				user["firstName"] != name ||
				user["lastName"] != surname ||
				user["avatarUrl"] != avatarUrl ||
				!deepEqual(user["programmingLanguages"], programmingLanguages)
			) {
				return false;
			} else {
				return true;
			}
		} else {
			if (
				user["username"] != username ||
				user["industry"] != industry ||
				user["avatarUrl"] != avatarUrl
			) {
				return false;
			} else {
				return true;
			}
		}
	}

	function saveDeleteDisableChecks() {
		return password == "" || email == "";
	}

	function saveChangePasswordChecks() {
		return (
			password == "" ||
			oldPassword == "" ||
			passwordRepeated == "" ||
			password != passwordRepeated
		);
	}

	async function saveChangedDetails(changePasswordRoute) {
		let data = {};
		let developer_languages = {};
		if (changePasswordRoute) {
			data = { password: [oldPassword, password] };
		} else {
			if (user["userType"] == "developer") {
				data = {
					...(user["username"] != username && { username: username }),
					...(user["firstName"] != name && { name: name }),
					...(user["lastName"] != surname && { surname: surname }),
					...(user["avatarUrl"] != avatarUrl && { avatar: avatarUrl }),
				};
			} else {
				data = {
					...(user["industry"] != industry && { industry: industry }),
					...(user["avatarUrl"] != avatarUrl && { avatar: avatarUrl }),
				};
			}
		}
		if (user["userType"] == "developer") {
			if (!deepEqual(user["programmingLanguages"], programmingLanguages)) {
				Object.keys(user["programmingLanguages"]).forEach((language) => {
					if (programmingLanguages[language] == undefined) {
						//Add null entries for removed languages
						let deleteLanguage = {};
						deleteLanguage[language] = null;
						developer_languages = {
							...developer_languages,
							...deleteLanguage,
						};
					} else if (
						user["programmingLanguages"][language] !=
						programmingLanguages[language]
					) {
						//Update changed entries
						let updatedLanguage = {};
						updatedLanguage[language] = programmingLanguages[language];
						developer_languages = {
							...developer_languages,
							...updatedLanguage,
						};
					}
				});
				Object.keys(programmingLanguages).forEach((language) => {
					//Add new language entries
					if (
						user["programmingLanguages"][language] !=
						programmingLanguages[language]
					) {
						let newLanguage = {};
						newLanguage[language] = programmingLanguages[language];
						developer_languages = {
							...developer_languages,
							...newLanguage,
						};
					}
				});
				let temp = {};
				temp["developer_languages"] = developer_languages;
				data = {
					...data,
					...temp,
				};
			}
		}

		updateUser(user["userType"], user["username"], data)
			.then(() => {
				loadUserProfile(user["userType"], username).then((data) => {
					setEdit(false);
					navigate(`/profile/${data["userType"]}/${data["username"]}`);
					notifySuccess("Updated successfully.");
				});
			})
			.catch((err) => notifyError(err));
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
					<Typography sx={{ fontSize: 30 }} color="primary">
						<b>Edit Profile</b>
					</Typography>
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
									<Stack spacing={2}>
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
											defaultValue={name}
											onChange={(event) => {
												setName(event.target.value);
											}}
											label="First Name"
										/>
										<TextField
											variant="outlined"
											defaultValue={surname}
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
								label="New Password"
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
								label="Repeat New Password"
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
								disabled={saveChangePasswordChecks()}
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
				<DialogTitle>
					Enter your email and password to confirm deletion
				</DialogTitle>
				<Stack padding={1} spacing={1}>
					<FormControl fullWidth>
						<InputLabel htmlFor="email-input">Email</InputLabel>
						<OutlinedInput
							id="email-input"
							name="email"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							label="Email"
						/>
					</FormControl>
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
								onClick={() => {
									login(email, password)
										.then(() => {
											deleteUser(user.userType, user.username)
												.then(() => {
													notifySuccess("Account successfully deleted.");
													logout();
													setTimeout(() => navigate("/"), 200);
												})
												.catch((err) => notifyError(err));
										})
										.catch((err) => notifyError(err));
								}}
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
