import React from "react";
import {
	Avatar,
	Paper,
	Stack,
	Typography,
	Grid,
} from "@mui/material";

function CompanyProfile(props) {
	const { auth , viewUser } = props;
	console.log(auth);

	return(
		<>
			<Grid container alignItems="flex-start" spacing={2} padding={3}>
				<Grid item xs={4}>
					<Paper elevation={4}>
						<Grid
							container
							alignItems="center"
							padding={2}
							justifyContent="space-between"
						>
							<Grid item>
								<Avatar
									sx={{ width: 100, height: 100 }}
									src={viewUser.avatarUrl}
								></Avatar>
							</Grid>
							<Grid item>
								<Stack>
									<Typography variant="h3">{viewUser.username}</Typography>
									<Typography variant="h6">{viewUser.email}</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}

export default CompanyProfile;