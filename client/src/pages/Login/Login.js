import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


function Login() {


	return(
		<React.Fragment>
			<Container maxWidth="sm" sx={{backgroundColor: "white" }} >
				<Box component="form">
					<Grid 
						container
						direction="column"
						spacing={2}
						alignItems="stretch"
					>
						<Grid item xs={12}>
							<Typography
								varianat="h3"
								color="primary"
								gutterBottom
								alignSelf={"centre"}
							>
								Login
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</React.Fragment>
	);
}
export default Login;