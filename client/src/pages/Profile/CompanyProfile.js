import React from "react";
import {
	Paper,
	Stack,
	Typography,
	Grid,
	Container,
	Avatar
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
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.g3}}>
							<Grid
								container
								alignItems="center"
								padding={2}
								justifyContent="space-between"
							>
								<Grid item>
									<Avatar
										sx={{ width: 100, height: 100, borderRadius:"16px",border:4,borderColor: theme.palette.text.light}}
										src={viewUser.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item >
									<Stack>
										<Typography variant="h3" color={theme.palette.text.light}>{viewUser.username}</Typography>
										<Typography variant="h5" color={theme.palette.text.light}>{viewUser.email}</Typography>
										<Typography variant="h6" color={theme.palette.text.light}>{viewUser.industry}</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3} >
						
					</Grid>
					<Grid item xs={12}>
						<ContractList 
							condensed
							method="value"
							descending={true}
							viewUser={viewUser}
							status="open"
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default CompanyProfile;