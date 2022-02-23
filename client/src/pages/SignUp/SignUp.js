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

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState("developer");

	console.log({ email, password, userType });

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	return (
		<React.Fragment>
			<Container maxWidth="sm" sx={{ backgroundColor: "white" }}>
				<Box component="form">
					<Grid
						container
						direction="column"
						spacing={2}
						alignItems="stretch"
					>
						<Grid item xs={12}>
							<Typography
								variant="h3"
								color="primary"
								gutterBottom
								align="center"
							>
                                Sign Up
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel htmlFor="email-input">
                                    Email Address
								</InputLabel>
								<OutlinedInput
									id="email-input"
									value={email}
									type="email"
									onChange={(event) => {
										setEmail(event.target.value);
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
									type={showPassword ? "text" : "password"}
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
								<FormLabel id="demo-row-radio-buttons-group-label">
                                    User Type
								</FormLabel>
								<RadioGroup
									row
									name="developer-type-group"
									onChange={(event) =>
										setUserType(event.target.value)
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
                                    Sign Up
								</Button>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default SignUp;
