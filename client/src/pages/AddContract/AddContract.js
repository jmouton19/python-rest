import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";



function AddContract() {
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");
	const [length, setLength] = useState("");
	
	let navigate = useNavigate();
	const routeChange = () => {
		let path = "/";
		navigate(path);
	};
	return (
		<React.Fragment>
			<Container maxWidth="sm">
				<Box component="form" paddingTop={3}>
					<Grid container direction="column" spacing={2} alignItems="stretch">
						<Grid item xs={12}>
							<Typography variant="h3" color="primary" align="center">
								Add new contract
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel htmlFor="contract-description">
									Contract Description
								</InputLabel>
								<OutlinedInput
									id="contract-description"
									value={description}
									type="description"
									multiline
									onChange={(event) => {
										setDescription(event.target.value);
									}}
									label="Contract Description"
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<LanguagesPicker />
						</Grid>
						<Grid 
							container
							direction="row"
							spacing={3}
							justifyContent="center"
						>
							<Grid item xs={5}>
								<FormControl >
									<InputLabel htmlFor="contract-value">
										Contract Value (ZAR)
									</InputLabel>
									<OutlinedInput
										id="contract-value"
										value={value}
										type="value"
										currencySymbol="R"
										decimalCharacter="."
										onChange={(event) => {
											setValue(event.target.value);
										}}
										label="Contract Value (ZAR)"
										startAdornment={
											<InputAdornment position="start">
												R
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={5}>
								<FormControl>
									<InputLabel htmlFor="contract-length">
										Contract Length (Months)
									</InputLabel>
									<OutlinedInput
										id="contract-length"
										value={length}
										type="length"
										onChange={(event) => {
											setLength(event.target.value);
										}}
										label="Contract Length (Months)"
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<Button variant="contained" onClick={routeChange}>
									Add Contract
								</Button>
							</FormControl>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default AddContract;