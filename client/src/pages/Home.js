import { Button, Container, FormControl, Grid } from "@mui/material";
import React from "react";
import { useLogin } from "../AuthProvider";
import "./Home.css";

function Home() {
	const simulateLogin = useLogin();

	return (
		<>
			<Container maxWidth="md">
				<Grid container padding={2} justifyContent="center">
					<Grid item xs={12}>
						<FormControl fullWidth>
							<Button
								variant="contained"
								onClick={() => simulateLogin("nicolvisser@yahoo.com", "1234")}
							>
								Simulate Login
							</Button>
						</FormControl>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Home;
