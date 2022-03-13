import {
	Box,
	Button,
	Container,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Radio,
	RadioGroup,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	checkIfUniqueEmail,
	checkIfUniqueUsername,
	signUp,
} from "../../utils/apiCalls";

import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";
import StyledLink from "../../components/StyledLink";
import { useLogin } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function SignUp() {
	const [activeStep, setActiveStep] = React.useState(0);

	const [username, setUsername] = useState("");
	const [usernameError, setUsernameError] = useState({
		status: false,
		msg: "",
	});
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState({ status: false, msg: "" });
	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [passwordError, setPasswordError] = useState({
		status: false,
		msg: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("developer");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [industry, setIndustry] = useState("");
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [programmingLanguages, setProgrammingLanguages] = useState({});

	const login = useLogin();

	const navigate = useNavigate();

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	const validateUsername = () => {
		if (username === "") {
			setUsernameError({
				status: true,
				msg: "Please enter a username",
			});
			return;
		}
		if (!validator.isAlphanumeric(username)) {
			setUsernameError({
				status: true,
				msg: "No special characters allowed.",
			});
			return;
		}
		checkIfUniqueUsername(userType, username).then((unique) => {
			if (!unique)
				setUsernameError({
					status: true,
					msg: "Username already in use.",
				});
			return;
		});
		// on no error:
		setUsernameError({ status: false, msg: "" });
	};

	const validateEmail = () => {
		if (email === "") {
			setEmailError({
				status: true,
				msg: "Please enter an email address.",
			});
			return;
		}
		if (!validator.isEmail(email)) {
			setEmailError({
				status: true,
				msg: "Incorrect email format.",
			});
			return;
		}
		checkIfUniqueEmail(email).then((unique) => {
			if (!unique)
				setEmailError({
					status: true,
					msg: "Email already in use.",
				});
			return;
		});
		// on no error:
		setEmailError({ status: false, msg: "" });
	};

	const validatePassword = () => {
		if (password === "") {
			setPasswordError({
				status: true,
				msg: "Please enter a password.",
			});
			return;
		}
		if (password.length < 8) {
			setPasswordError({
				status: true,
				msg: "Must be at least 8 characters long.",
			});
			return;
		}
		// on no error:
		setPasswordError({ status: false, msg: "" });
	};

	function step1ButtonDisabledChecks() {
		return (
			usernameError.status ||
			emailError.status ||
			password.status ||
			password != passwordRepeated
		);
	}

	function step2ButtonDisabledChecks() {
		if (userType == "developer") {
			return (
				firstName === "" ||
				lastName === "" ||
				Object.entries(programmingLanguages).length === 0
			);
		} else {
			return avatarUrl === null || industry === "";
		}
	}

	function completeSignUp() {
		let data;
		if (userType == "developer") {
			data = {
				username,
				email,
				name: firstName,
				surname: lastName,
				password,
				avatar: avatarUrl,
				developer_languages: programmingLanguages,
			};
		} else {
			data = {
				company_name: username,
				email,
				password,
				avatar: avatarUrl,
				industry,
			};
		}

		signUp(userType, data).then((res) => {
			if (res) {
				login(email, password).then(() => navigate("/"));
			}
		});
	}

	function CompleteSignUpBox() {
		return (
			<Box>
				<Button
					disabled={step2ButtonDisabledChecks()}
					variant="contained"
					onClick={completeSignUp}
					sx={{ mt: 2, mr: 1 }}
				>
					Sign Up
				</Button>
				<Button
					onClick={() => setActiveStep(activeStep - 1)}
					sx={{ mt: 2, mr: 1 }}
				>
					Back
				</Button>
			</Box>
		);
	}

	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Stack alignItems="center">
					<Typography variant="h3" color="primary" gutterBottom paddingTop={3}>
						Sign Up
					</Typography>
				</Stack>

				<Typography variant="caption" color="primary">
					<StyledLink to="/login">
						{"Already have an account? Log in instead."}
					</StyledLink>
				</Typography>
				<Box>
					<Stepper activeStep={activeStep} orientation="vertical">
						<Step key="User Credentials">
							<StepLabel>User Credentials</StepLabel>
							<StepContent>
								<Box component="form">
									<Grid
										container
										direction="column"
										spacing={2}
										alignItems="stretch"
										paddingTop={2}
									>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<FormLabel id="developer-type-label">
													User Type
												</FormLabel>
												<RadioGroup
													row
													name="developer-type-group"
													onChange={(event) => setUserType(event.target.value)}
													value={userType}
												>
													<FormControlLabel
														value="developer"
														control={<Radio />}
														label="Developer"
													/>
													<FormControlLabel
														value="company"
														control={<Radio />}
														label="Company"
													/>
												</RadioGroup>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel htmlFor="username-input">
													{userType === "developer"
														? "Username"
														: "Company Name"}
												</InputLabel>
												<OutlinedInput
													id="username-input"
													type="text"
													value={username}
													name="username"
													onChange={(event) => {
														setUsername(event.target.value);
													}}
													onBlur={validateUsername}
													label={
														userType === "developer"
															? "Username"
															: "Company Name"
													}
													error={usernameError.status}
												/>
											</FormControl>
											{usernameError.status ? (
												<FormHelperText
													id="username-helper-text"
													sx={{
														color: "red",
													}}
												>
													{usernameError.msg}
												</FormHelperText>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel htmlFor="email-input">
													Email Address
												</InputLabel>
												<OutlinedInput
													id="email-input"
													type="email"
													name="email"
													value={email}
													onChange={(event) => {
														setEmail(event.target.value);
													}}
													onBlur={validateEmail}
													label="Email Address"
													error={emailError.status}
												/>
											</FormControl>
											{emailError.status ? (
												<FormHelperText
													id="email-helper-text"
													sx={{
														color: "red",
													}}
												>
													{emailError.msg}
												</FormHelperText>
											) : null}
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel htmlFor="password-input">
													Password
												</InputLabel>
												<OutlinedInput
													id="password-input"
													type={showPassword ? "text" : "password"}
													name="password"
													autoComplete="new-password"
													value={password}
													onChange={(event) => {
														setPassword(event.target.value);
													}}
													onBlur={validatePassword}
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
											{passwordError.status && (
												<FormHelperText
													id="password-helper-text"
													sx={{
														color: "red",
													}}
												>
													{passwordError.msg}
												</FormHelperText>
											)}
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel htmlFor="password-repeat-input">
													Repeat Password
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
										</Grid>
									</Grid>
								</Box>
								<Box>
									<Button
										variant="contained"
										onClick={() => setActiveStep(activeStep + 1)}
										sx={{ mt: 2, mr: 1 }}
										disabled={step1ButtonDisabledChecks()}
									>
										Continue
									</Button>
									<Button disabled sx={{ mt: 2, mr: 1 }}>
										Back
									</Button>
								</Box>
							</StepContent>
						</Step>
						<Step key="User Details">
							<StepLabel>{`Tell us a bit more about ${
								userType === "developer" ? "yourself" : "your company"
							}`}</StepLabel>
							{userType === "developer" ? (
								// Todo fix this approach of passing everything as state
								<StepContent>
									<Box component="form">
										<Grid
											container
											direction="column"
											spacing={2}
											alignItems="stretch"
										>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel htmlFor="first-name-input">
														First Name
													</InputLabel>
													<OutlinedInput
														id="first-name-input"
														label="First Name"
														onChange={(event) => {
															setFirstName(event.target.value);
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel htmlFor="last-name-input">
														Last Name
													</InputLabel>
													<OutlinedInput
														id="last-name-input"
														label="Last Name"
														onChange={(event) => {
															setLastName(event.target.value);
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<InputLabel> Avatar</InputLabel>
												<AvatarPicker
													setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
												/>
											</Grid>
											<Grid item xs={12}>
												<LanguagesPicker
													setLanguagesCallback={(languages) =>
														setProgrammingLanguages(languages)
													}
												/>
											</Grid>
										</Grid>
									</Box>
									<CompleteSignUpBox />
								</StepContent>
							) : (
								<StepContent>
									<Box component="form">
										<Grid
											container
											direction="column"
											spacing={2}
											alignItems="stretch"
										>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel htmlFor="general-industry-input">
														General Industry
													</InputLabel>
													<OutlinedInput
														id="general-industry-input"
														label="General Industry"
														onChange={(event) => {
															setIndustry(event.target.value);
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<InputLabel>Company Logo</InputLabel>
												<AvatarPicker
													setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
												/>
											</Grid>
										</Grid>
									</Box>
									<CompleteSignUpBox />
								</StepContent>
							)}
						</Step>
					</Stepper>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default SignUp;
