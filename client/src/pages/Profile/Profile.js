import React from "react";
import { useUserCredentials } from "../../AuthProvider";
import Grid from "@mui/material/Grid";
import { Avatar, Container, Paper, Stack, Typography } from "@mui/material";

function Profile() {
	const user = useUserCredentials();
	return (
		<React.Fragment>
			<Container maxWidth="md">
				<Grid 
					container 
					padding= {1} 
					rowSpacing={3}
					alignItems="center"
				>
					<Grid item xs={12}>
						<Paper >
							<Grid 
								container
								alignItems="center"
								padding={2}
							>
								<Grid item xs={3}>
									<Avatar 
										sx={{width: 100, height: 100}} 
										src={user.avatarUrl}
									>
									</Avatar>
								</Grid>
								<Grid item xs={9} spacing={8}>
									<Stack>
										{user.userType === "developer" ? (
											<div>
												<Typography variant="h3" >
													{user.firstName} {user.lastName}
												</Typography>
												<Typography variant="h5" >
													{user.username}
												</Typography>
												<Typography variant="h6">
													{user.email}
												</Typography>
											</div>
										) : (
											<div>
												<Typography variant="h3" >
													{user.username}
												</Typography>
												<Typography variant="h6" >
													{user.email}
												</Typography>
											</div>
										)}
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>	
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Profile;
