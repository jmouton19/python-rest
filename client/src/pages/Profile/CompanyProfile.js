import React from "react";
import {
	Avatar,
	Paper,
	Stack,
	Typography,
	Grid,
	Container,
	Button,
} from "@mui/material";
import ContractList from "../../components/ContractList/ContractList";

function CompanyProfile(props) {
	const { auth , viewUser } = props;
	console.log(auth);

	return(
		<>
			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={12} md={9}>
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
								<Grid item >
									<Stack>
										<Typography variant="h3">{viewUser.username}</Typography>
										<Typography variant="h5">{viewUser.email}</Typography>
										<Typography variant="h6">{viewUser.industry}</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3} >
						
					</Grid>
					<Grid item xs={12}>
						<ContractList 
							method="value"
							descending={true}
							axiosUrl={"https://cs334proj1group8.herokuapp.com/api/contract"}
							condensed={true}
						>
							<Button size="small">Apply</Button>
						</ContractList>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default CompanyProfile;