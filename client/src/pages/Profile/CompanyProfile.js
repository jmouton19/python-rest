import React, { useEffect, useState } from "react";
import {
	Paper,
	Stack,
	Typography,
	Grid,
	Container,
	Avatar,
} from "@mui/material";
import ContractList from "../../components/ContractList/ContractList";
import { useTheme } from "@mui/material";
import { fetchCompanysContracts } from "../../utils/apiCalls";
import { groupByClosed, totalMoney } from "../../utils/contractSorting";

function CompanyProfile(props) {
	const theme = useTheme();
	const { viewUser, authUser } = props;
	const [moneySpent, setMoneySpent] = useState(0);
	const [employees, setEmployees] = useState(0);
	console.log(authUser.username);
	console.log(viewUser.username);

	useEffect(() => {
		getContractSummary();
	}, [viewUser]);

	function getContractSummary() {
		fetchCompanysContracts(viewUser.username).then((res) => {
			setMoneySpent(totalMoney(groupByClosed(res)));
			setEmployees(groupByClosed(res).length);
		});
	}

	return(
		<>
			<Container>
				<Grid container alignItems="flex-start" spacing={2} padding={3}>
					<Grid item xs={12} md={9}>
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.g4}}>
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
					<Grid item xs={12} md={3}>
						<Paper elevation={4} sx={{backgroundColor: theme.palette.primary.g2}}>
							<Stack >
								{authUser.username == viewUser.username && (
									<Stack backgroundColor="#d32f2f" padding={1} borderRadius= {1}>
										<Typography variant="caption" color={theme.palette.text.light}>
											Money spent:
										</Typography>
										<Typography  variant="h4" color={theme.palette.text.light} align="center">
											$ {moneySpent}
										</Typography>
									</Stack>
								)}
								<Stack padding={1} justifyContent="flex-start">
									<Typography variant="h6" color={theme.palette.text.light} align="center">
										Number of Employees: {employees}
									</Typography>
								</Stack>
							</Stack>
						</Paper>				
					</Grid>
					<Grid item xs={12}>
						<ContractList 
							condensed
							method="value"
							descending={true}
							viewUser={viewUser}
							authUser={authUser}
							status="open"
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default CompanyProfile;