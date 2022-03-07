import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useLogin } from "../../AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// where to redirect to after login if someone came from a restricted private route
	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");
	const navigate = useNavigate();

	const login = useLogin();

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Box component="form" paddingTop={3}>
					<Grid container direction="column" spacing={2} alignItems="stretch">
						<Grid item xs={12}>
							<Typography variant="h3" color="primary" align="center">
								Login
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel htmlFor="email-input">Email Address</InputLabel>
								<OutlinedInput
									id="email-input"
									value={email}
									type="email"
									onChange={(event) => {
										setEmail(event.target.value);
									}}
									label="Email Address / Company Name"
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel htmlFor="password-input">Password</InputLabel>
								<OutlinedInput
									id="password-input"
									value={password}
									type={showPassword ? "text" : "password"}
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
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<Button
									variant="contained"
									onClick={() => {
										login(email, password).then(() => navigate(redirect));
									}}
								>
									Login
								</Button>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
}
export default Login;
