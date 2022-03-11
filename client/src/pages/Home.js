import { Button, Container, FormControl, Grid } from "@mui/material";
import React from "react";
import { useLogin } from "../AuthProvider";
import "./Home.css";

function Home() {
	const sampleLogin = useLogin();

	return (
		<>
			<Container maxWidth="md">
				<Grid container padding={2} justifyContent="center">
					<Grid item xs={12}>
						<FormControl fullWidth>
							<Button
								variant="contained"
								onClick={() => sampleLogin("nicolvisser@yahoo.com", "12341234")}
							>
								Sample Login: email: nicolvisser@yahoo.com, password: 12341234
							</Button>
							<Button
								variant="contained"
								sx={{ mt: 2 }}
								onClick={() => sampleLogin("admin@disney.com", "12341234")}
							>
								Sample Login: email: admin@disney.com, password: 12341234
							</Button>
						</FormControl>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Home;
