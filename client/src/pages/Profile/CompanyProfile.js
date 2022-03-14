import { Avatar, Box, Grid, Paper, Stack, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { groupByClosed, totalMoney } from "../../utils/contractSorting";

import ContractList from "../../components/ContractList/ContractList";
import { currencyFormatter } from "../../utils/utils";
import { fetchCompanysContracts } from "../../utils/apiCalls";

function CompanyProfile(props) {
	const { viewUser, authUser } = props;
	const [moneySpent, setMoneySpent] = useState(0);
	const [numberContractsClosed, setNumberContractsClosed] = useState(0);

	useEffect(() => {
		getContractSummary();
	}, [viewUser]);

	function getContractSummary() {
		fetchCompanysContracts(viewUser.username).then((res) => {
			setMoneySpent(totalMoney(groupByClosed(res)));
			setNumberContractsClosed(groupByClosed(res).length);
		});
	}

	return (
		<Container>
			<Grid container spacing={2} padding={3}>
				<Grid item xs={12} md={8}>
					<Paper elevation={4} sx={{ height: "100%" }}>
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
									<Typography variant="h3">{viewUser.username}</Typography>
									<Typography variant="h5">{viewUser.email}</Typography>
									<Typography variant="h6">{viewUser.industry}</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper elevation={4} sx={{ height: "100%" }}>
						<Stack sx={{ height: "100%" }}>
							{authUser.username == viewUser.username && (
								<Stack backgroundColor="#d32f2f" padding={1} borderRadius={1}>
									<Typography variant="caption">Money spent:</Typography>
									<Typography variant="h4" align="center">
										{currencyFormatter.format(moneySpent)}
									</Typography>
								</Stack>
							)}
							<Stack sx={{ height: "100%" }} padding={1}>
								<Typography variant="caption" color="error">
									# Contracts Closed
								</Typography>
								<Typography variant="h4" align="center">
									{numberContractsClosed}
								</Typography>
							</Stack>
						</Stack>
						<Box sx={{ flexGrow: 1 }} />
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
	);
}

export default CompanyProfile;
