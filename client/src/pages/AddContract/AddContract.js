import React, { useState } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";


function AddContract() {
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");
	const [length, setLength] = useState("");
	const [checked, setChecked] = React.useState(true);
	
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	
	function postContract() {
		const data = {
			// "name": variable,
			length: parseInt(length),
			value: parseInt(value),
			title: "Title",
			description: description,
			remote: checked,
			open: true,
			company_name: "Goggle3",
			contract_languages: { Java: 6, Kotlin: 3 },
		};
		console.log(data);

		axios
			.post("https://cs334proj1group8.herokuapp.com/api/contract", data)
			.then(function (response) {
				console.log(response);

				// TODO: take user to different page
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<React.Fragment>
			<Container maxWidth="md">
				<Box component="form" paddingTop={3}>
					<Grid container direction="column" spacing={3} alignItems="stretch">
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
									type="text"
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
						<Grid item
							container
							direction="row"
							spacing={2}
							justifyContent="flex-start"
							
						>
							<Grid item xs={5} >
								<FormControl >
									<InputLabel htmlFor="contract-value">
										Contract Value (ZAR)
									</InputLabel>
									<OutlinedInput
										id="contract-value"
										value={value}
										type="number"
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
										type = "number"
										id="contract-length"
										value={length}
										onChange={(event) => {
											setLength(event.target.value);
										}}
										label="Contract Length (Months)"
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography align="flex-start">
								Select applicable work locations:
							</Typography>
						</Grid>
						<Grid item
							container
							direction="row"
							spacing={2}
							justifyContent="flex-start"
							
						>
							<FormControlLabel
								control={<Checkbox checked={0} onChange={handleChange} name="open"/>}
								label="Remote"
							/>
							<FormControlLabel
								control={<Checkbox checked={checked} onChange={handleChange} name="office"/>}
								label="Office"
							/>
						</Grid>
						<Grid item xs={12} >
							<FormControl fullWidth justifyContent="flex-end">
								<Button variant="contained" onClick={postContract} >
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