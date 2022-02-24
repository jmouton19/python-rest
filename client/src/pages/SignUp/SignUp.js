import React, { useState } from "react";
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
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeated, setPasswordRepeated] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("developer");

	console.log({ email, password, userType });

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	function checkUserCredentials() {
		axios
			.get(`https://cs334proj1group8.herokuapp.com/user=${email}`)
			.then((res) => {
				const { email } = res.data;
				if (email !== null) {
					alert("Email already in use");
				}
				else {
					setActiveStep(activeStep + 1);
				}
			});
	}

	const [activeStep, setActiveStep] = React.useState(0);

	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Typography
					variant="h3"
					color="primary"
					gutterBottom
					paddingTop={3}
				>
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
												<InputLabel htmlFor="email-input">
                                                    Email Address
												</InputLabel>
												<OutlinedInput
													id="email-input"
													value={email}
													type="email"
													name="email"
													onChange={(event) => {
														setEmail(
															event.target.value
														);
													}}
													label="Email Address"
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
											<FormControl fullWidth>
												<InputLabel htmlFor="password-input">
                                                    Password
												</InputLabel>
												<OutlinedInput
													id="password-input"
													type={
														showPassword
															? "text"
															: "password"
													}
													value={password}
													name="password"
													autoComplete="new-password"
													onChange={(event) => {
														setPassword(
															event.target.value
														);
													}}
													label="Password"
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																onClick={
																	toggleShowPassword
																}
																onMouseDown={
																	toggleShowPassword
																}
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
													type={
														showPassword
															? "text"
															: "password"
													}
													value={passwordRepeated}
													name="password"
													autoComplete="new-password"
													onChange={(event) => {
														setPasswordRepeated(
															event.target.value
														);
													}}
													label="Repeat Password"
													error={
														password !==
                                                        passwordRepeated
													}
												/>
												{password !==
                                                passwordRepeated ? (
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
													onChange={(event) =>
														setUserType(
															event.target.value
														)
													}
													defaultValue="developer"
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
												<Button
													variant="contained"
													onClick={() =>
														alert(
															JSON.stringify({
																email,
																password,
																userType,
															})
														)
													}
												>
                                                    Test Data
												</Button>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box sx={{ mb: 2 }}>
									<Button
										variant="contained"
										onClick={checkUserCredentials}
										sx={{ mt: 1, mr: 1 }}
										disabled={password != passwordRepeated}
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
								userType === "developer"
									? "yourself"
									: "your company"
							}`}</StepLabel>
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
												/>
											</FormControl>
										</Grid>
										<Grid item xs={12}>
                                            We need more things here ...
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
											onClick={() =>
												setActiveStep(activeStep - 1)
											}
											sx={{ mt: 1, mr: 1 }}
										>
                                            Back
										</Button>
									</div>
								</Box>
							</StepContent>
						</Step>
					</Stepper>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default SignUp;
