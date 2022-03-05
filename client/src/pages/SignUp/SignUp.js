import React, { useState } from "react";

import {
	Box,
	FormControl,
	Container,
	InputLabel,
	OutlinedInput,
	Grid,
	Typography,
	InputAdornment,
	IconButton,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Radio,
	Button,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	FormHelperText,
} from "@mui/material";

import axios from "axios";

import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useCheckUsername, useCheckEmail, useLogin } from "../../AuthProvider";

function SignUp() {
	const [activeStep, setActiveStep] = React.useState(0);

	const [username, setUsername] = useState("");
	const [usernameInUseError, setUsernameInUseError] = useState(false);
	const [email, setEmail] = useState("");
	const [emailInUseError, setEmailInUseError] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("developer");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [industry, setIndustry] = useState("");
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [programmingLanguages, setProgrammingLanguages] = useState({});

	const checkUsername = useCheckUsername();
	const checkEmail = useCheckEmail();
	const login = useLogin();

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	function step1ButtonDisabledChecks() {
		//Todo: Check for valid email address format
		//Todo: Check for strong pasword
		return (
			username === "" ||
			email == "" ||
			password == "" ||
			password != passwordRepeated ||
			usernameInUseError ||
			emailInUseError
		);
	}

	function completeSignUp() {
		const baseUrl = "https://cs334proj1group8.herokuapp.com";

		console.log(userType);

		const url = `${baseUrl}/api/${userType}`;

		console.log(userType);
		const data =
			userType == "developer"
				? {
					username,
					email,
					name: firstName,
					surname: lastName,
					password,
					avatar: avatarUrl,
					developer_languages: programmingLanguages,
				}
				: {
					company_name: username,
					email,
					password,
					avatar: avatarUrl,
					industry,
				};

		console.log("Trying to sign up with the following details: ...");
		console.log(data);

		axios
			.post(url, data)
			.then((res) => {
				if (res.data.success) {
					console.log("Sign Up was successfull. User will now be logged in...");
					login(email, password);
				}
			})
			.catch((err) => console.log(err));

		axios.post();
	}

	function CompleteSignUpBox() {
		return (
			<Box>
				<Button
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
				<Typography variant="h3" color="primary" gutterBottom paddingTop={3}>
					Sign Up
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
													onBlur={(event) => {
														const { value } = event.target;
														{
															checkUsername(value).then((res) =>
																setUsernameInUseError(res)
															);
														}
													}}
													label={
														userType === "developer"
															? "Username"
															: "Company Name"
													}
													error={usernameInUseError}
												/>
											</FormControl>
											{usernameInUseError ? (
												<FormHelperText
													id="username-helper-text"
													sx={{
														color: "red",
													}}
												>
													Username already in use
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
													onBlur={(event) => {
														const { value } = event.target;
														{
															checkEmail(value).then((res) =>
																setEmailInUseError(res)
															);
														}
													}}
													label="Email Address"
													error={emailInUseError}
												/>
											</FormControl>
											{emailInUseError ? (
												<FormHelperText
													id="email-helper-text"
													sx={{
														color: "red",
													}}
												>
													Email already in use
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
