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
	RadioGroup,
	FormLabel,
	Radio,
} from "@mui/material";
import LanguagesPicker from "../../components/LanguagesPicker/LanguagesPicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../AuthProvider";

import axios from "axios";

function AddContract() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("0");
	const [length, setLength] = useState("0");
	const [location, setLocation] = useState("remote");
	const [selectedLanguages, setSelectedLanguages] = useState({});

	const user = useUser();

	function ButtonDisabledChecks() {
	
		return (
			description === "" ||
			title === ""
		);
	}

	function postContract() {
		const data = {
			// "name": variable,
			length: parseInt(length),
			value: parseInt(value),
			title: title,
			description: description,
			remote: location === "remote",
			open: true,
			company_name: user.username,
			contract_languages: selectedLanguages,
		};

		console.log("Trying to send contract data via API: ...");
		console.log(data);

		axios
			.post("https://cs334proj1group8.herokuapp.com/api/contract", data)
			.then(function (response) {
				console.log(response);
				navigate("/contracts");

				// TODO: take user to different page
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	if (user.userType == "developer") {
		return (
			<p> Sorry, but you are not a company. You should not be seeing this.</p>
		);
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
								<InputLabel htmlFor="contract-title">Contract Title</InputLabel>
								<OutlinedInput
									id="contract-title"
									value={title}
									type="text"
									onChange={(event) => {
										setTitle(event.target.value);
									}}
									label="Contract Title"
								/>
							</FormControl>
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
							<LanguagesPicker
								setLanguagesCallback={(languages) => {
									setSelectedLanguages(languages);
								}}
							/>
						</Grid>
						<Grid item container direction="row" spacing={2}>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel htmlFor="contract-value">
										Contract Value (ZAR)
									</InputLabel>
									<OutlinedInput
										id="contract-value"
										value={value}
										type="number"
										onChange={(event) => {
											setValue(event.target.value);
										}}
										label="Contract Value (ZAR)"
										startAdornment={
											<InputAdornment position="start">R</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel htmlFor="contract-length">
										Contract Length
									</InputLabel>
									<OutlinedInput
										type="number"
										id="contract-length"
										value={length}
										onChange={(event) => {
											setLength(event.target.value);
										}}
										label="Contract Length"
										endAdornment={
											<InputAdornment position="end">months</InputAdornment>
											
										}
										
									/>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl fullWidth>
									<FormLabel id="location">
										Set work location:
									</FormLabel>
									<RadioGroup
										name="location"
										row
										onChange={(event) => {
											setLocation(event.target.value);
										}}
										value={location}
									>
										<FormControlLabel
											value="remote"
											control={<Radio />}
											label="Remote"
										/>
										<FormControlLabel
											value="office"
											control={<Radio />}
											label="Office"
										/>
									</RadioGroup>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl fullWidth>
									<Button disabled={ButtonDisabledChecks()} variant="contained" onClick={postContract}>
										Add Contract
									</Button>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default AddContract;
