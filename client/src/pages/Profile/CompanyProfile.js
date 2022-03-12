import {
	Avatar,
	Container,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { groupByClosed, totalMoney } from "../../utils/contractSorting";

import ContractList from "../../components/ContractList/ContractList";
import { fetchCompanysContracts } from "../../utils/apiCalls";

function CompanyProfile(props) {
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

	return (
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
										sx={{
											width: 100,
											height: 100,
											borderRadius: "16px",
											border: 4,
										}}
										src={viewUser.avatarUrl}
									></Avatar>
								</Grid>
								<Grid item>
									<Stack>
										<Typography variant="h3" >
											{viewUser.username}
										</Typography>
										<Typography variant="h5" >
											{viewUser.email}
										</Typography>
										<Typography variant="h6" >
											{viewUser.industry}
										</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3}>
						<Paper
							elevation={4}
						>
							<Stack>
								{authUser.username == viewUser.username && (
									<Stack backgroundColor="#d32f2f" padding={1} borderRadius={1}>
										<Typography
											variant="caption"
										>
											Money spent:
										</Typography>
										<Typography
											variant="h4"
											align="center"
										>
											$ {moneySpent}
										</Typography>
									</Stack>
								)}
								<Stack padding={1} justifyContent="flex-start">
									<Typography
										variant="h6"
										align="center"
									>
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
