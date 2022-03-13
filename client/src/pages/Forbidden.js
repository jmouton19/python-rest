import { Container, Grid, Typography } from "@mui/material";

import React from "react";

const Forbidden = () => {
	return (
		<Container maxWidth="sm">
			<Grid container spacing={4} mt={2}>
				<Grid item xs={12}>
					<Typography variant="h5" color="primary">
						403 Forbidden
					</Typography>
					<Typography variant="caption" color="text">
						Oh no! The page you requested is forbidden to view.
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Forbidden;
