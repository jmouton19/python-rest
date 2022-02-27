import React, { useState } from "react";
import { useUserCredentials } from "../../AuthProvider";
import Grid from "@mui/material/Grid";
import {
	Avatar,
	Container,
	Fab,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AvatarPicker from "../SignUp/AvatarPicker";

const fabStyle = {
	margin: 0,
	top: "auto",
	right: 20,
	bottom: 20,
	left: "auto",
	position: "fixed",
};

function Profile() {
	const user = useUserCredentials();
	const [editable, setEditable] = useState(false);

	return (
		<React.Fragment>
			<Fab
				style={fabStyle}
				color="primary"
				aria-label="edit"
				onClick={() => setEditable(!editable)}
			>
				<EditIcon />
			</Fab>
			<Container maxWidth="md">
				<Grid container padding={1} rowSpacing={3} alignItems="center">
					{editable ? ( //Editable layout TODO: change actual values on save
						<Grid item xs={12}>
							<Paper elevation={4}>
								<Grid container alignItems="center" padding={2}>
									<Grid item xs={3}>
										<Stack>
											<Avatar
												sx={{ width: 100, height: 100 }}
												src={user.avatarUrl}
											></Avatar>
											<AvatarPicker
												hideAvatar={true}
												setAvatarUrl={(imageUrl) => user.setAvatarUrl(imageUrl)}
											/>
										</Stack>
									</Grid>
									<Grid item xs={9} spacing={8}>
										{user.userType === "developer" ? (
											<Stack>
												<Stack direction="row">
													<TextField
														variant="standard"
														defaultValue={user.firstName}
														inputProps={{ style: { fontSize: 48 } }}
														size="small"
													/>
													<TextField
														variant="standard"
														defaultValue={user.lastName}
														inputProps={{ style: { fontSize: 48 } }}
														size="small"
													/>
												</Stack>
												<TextField
													variant="standard"
													defaultValue={user.username}
													inputProps={{ style: { fontSize: 25 } }}
												/>
												<TextField
													variant="standard"
													defaultValue={user.email}
													inputProps={{ style: { fontSize: 20 } }}
												/>
											</Stack>
										) : (
											<Stack>
												<TextField
													variant="standard"
													defaultValue={user.username}
													inputProps={{ style: { fontSize: 48 } }}
													size="small"
												/>
												<TextField
													variant="standard"
													defaultValue={user.email}
													inputProps={{ style: { fontSize: 20 } }}
												/>
											</Stack>
										)}
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					) : ( //Non-edit profile version
						<Grid item xs={12}>
							<Paper elevation={4}>
								<Grid container alignItems="center" padding={2}>
									<Grid item xs={3}>
										<Avatar
											sx={{ width: 100, height: 100 }}
											src={user.avatarUrl}
										></Avatar>
									</Grid>
									<Grid item xs={9} spacing={8}>
										<Stack>
											{user.userType === "developer" ? (
												<div>
													<Typography variant="h3">
														{user.firstName} {user.lastName}
													</Typography>
													<Typography variant="h5">{user.username}</Typography>
													<Typography variant="h6">{user.email}</Typography>
												</div>
											) : (
												<div>
													<Typography variant="h3">{user.username}</Typography>
													<Typography variant="h6">{user.email}</Typography>
												</div>
											)}
										</Stack>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					)}
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default Profile;
