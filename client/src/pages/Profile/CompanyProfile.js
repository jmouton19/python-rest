import React from "react";
import {
	Avatar,
	Paper,
	Stack,
	Typography,
	Grid,
	Container,
} from "@mui/material";
import ContractList from "../../components/ContractList/ContractList";
import { useTheme } from "@mui/material";


function CompanyProfile(props) {
	const theme = useTheme();
	const { viewUser } = props;

	return(
		<>
			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={12} md={9}>
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.c2}}>
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
							axiosUrl={`https://cs334proj1group8.herokuapp.com/api/company/${viewUser["username"]}/contract`}
							condensed={true}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default CompanyProfile;