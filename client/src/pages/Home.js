import { Button, Container, FormControl, Grid } from "@mui/material";
import React from "react";
import { useSimulateLogin } from "../AuthProvider";
import "./Home.css";

function Home() {
	const simulateLogin = useSimulateLogin();

	return (
		<>
			<Container maxWidth="md">
				<Grid 
					container 
					padding={2}
					justifyContent="center"
				>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<Button variant="contained" onClick={simulateLogin} >
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
