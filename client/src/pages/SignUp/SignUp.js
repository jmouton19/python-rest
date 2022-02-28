import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import FormHelperText from "@mui/material/FormHelperText";
import AvatarPicker from "./AvatarPicker";

import { useCheckUsername, useCheckEmail } from "../../AuthProvider";

const languageList = [
	"Python",
	"JavaScript",
	"Java",
	"C#",
	"C",
	"C++",
	"Go",
	"R",
	"Swift",
	"PHP",
];

const languagesInitialState = languageList.map((language) => ({
	name: language,
	checked: false,
}));

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
	const [languages, setLanguages] = useState(languagesInitialState);
	const [programmingLanguages, setProgrammingLanguages] = useState([]);

	const checkUsername = useCheckUsername();
	const checkEmail = useCheckEmail();

	console.log({
		username,
		email,
		password,
		userType,
		avatarUrl,
		programmingLanguages,
		firstName,
		lastName,
		industry,
	});

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	function toggleLanguageChecked(languageName) {
		// looks through the language state, which is a list
		// when it finds a match based on the language name it will toggle the checked variable
		// then saves this as new react state

		const newState = languages.map((language) => {
			if (language.name.localeCompare(languageName) == 0) {
				return {
					...language,
					checked: !language.checked,
				};
			}
			return language;
		});
		setLanguages(newState);
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

	useEffect(() => {
		const newSelectedLanguage = languages.reduce((previousValue, language) => {
			if (language.checked) {
				previousValue.push(language.name);
			}
			return previousValue;
		}, []);

		setProgrammingLanguages(newSelectedLanguage);
	}, [languages]);

	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Typography variant="h3" color="primary" gutterBottom paddingTop={3}>
					Sign Up
				</Typography>
				<Box sx={{ maxWidth: 400 }}>
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
												<InputLabel htmlFor="username-input">
													{userType === "developer" ? (
														<a>Username</a>
													) : (
														<a>Company Name</a>
													)}
												</InputLabel>
												<OutlinedInput
													id="username-input"
													type="text"
													name="username"
													onBlur={(event) => {
														const { value } = event.target;
														{
															checkUsername(value).then((res) =>
																setUsernameInUseError(res)
															);
															setUsername(event.target.value);
														}
													}}
													label="Username"
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
													onBlur={(event) => {
														const { value } = event.target;
														{
															checkEmail(value).then((res) =>
																setEmailInUseError(res)
															);
															setEmail(event.target.value);
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
									</Grid>
								</Box>
								<Box sx={{ mb: 2 }}>
									<Button
										variant="contained"
										onClick={() => setActiveStep(activeStep + 1)}
										sx={{ mt: 1, mr: 1 }}
										disabled={step1ButtonDisabledChecks()}
									>
										Continue
									</Button>
									<Button disabled sx={{ mt: 1, mr: 1 }}>
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
												<FormControl
													sx={{ m: 3 }}
													component="fieldset"
													variant="standard"
												>
													<FormLabel component="legend">
														Pick your programming languages
													</FormLabel>
													<FormGroup>
														{languages.map((language) => (
															<FormControlLabel
																key={language.name}
																control={
																	<Checkbox
																		checked={language.checked}
																		onChange={() => {
																			toggleLanguageChecked(language.name);
																		}}
																		name={language.name}
																	/>
																}
																label={language.name}
															/>
														))}
													</FormGroup>
													<FormHelperText>
														Experience in these will be setup later.
													</FormHelperText>
												</FormControl>
											</Grid>
										</Grid>
									</Box>
									<Box sx={{ mb: 2 }}>
										<div>
											<Button
												variant="contained"
												disabled
												sx={{ mt: 1, mr: 1 }}
											>
												Continue
											</Button>
											<Button
												onClick={() => setActiveStep(activeStep - 1)}
												sx={{ mt: 1, mr: 1 }}
											>
												Back
											</Button>
										</div>
									</Box>
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
												<InputLabel>
													{userType === "developer" ? "Avatar" : "Company Logo"}
												</InputLabel>
												<AvatarPicker
													setAvatarUrl={(imageUrl) => setAvatarUrl(imageUrl)}
												/>
											</Grid>
										</Grid>
									</Box>

									<Box sx={{ mb: 2 }}>
										<div>
											<Button
												variant="contained"
												disabled
												sx={{ mt: 1, mr: 1 }}
											>
												Continue
											</Button>
											<Button
												onClick={() => setActiveStep(activeStep - 1)}
												sx={{ mt: 1, mr: 1 }}
											>
												Back
											</Button>
										</div>
									</Box>
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
