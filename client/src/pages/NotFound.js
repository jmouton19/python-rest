import { Container, Grid, Typography } from "@mui/material";

import React from "react";

const NotFound = () => {
	return (
		<Container maxWidth="sm">
			<Grid container spacing={4} mt={2}>
				<Grid item xs={12}>
					<Typography variant="h5" color="primary">
						404 Error
					</Typography>
					<Typography variant="caption" color="text">
						Oh no! The page you requested could not be found.
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default NotFound;
