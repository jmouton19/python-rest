import { Avatar, Stack, TableCell, TableRow, Typography } from "@mui/material";

import React from "react";
import StyledLink from "../../components/StyledLink";

function ContractTable({ contract, children, viewUser }) {
	return (
		<>
			<TableRow key={contract.contract_id}>
				{viewUser.userType == "developer" && (
					<TableCell>
						<Stack direction="row" spacing={1} alignItems="center">
							<Avatar
								src={contract["company_avatar"]}
								sx={{ width: 24, height: 24 }}
							/>
							<Typography>
								<StyledLink
									to={`/profile/company/${contract.company_name}`}
									style={{
										textDecoration: "none",
									}}
								>
									{contract.company_name}
								</StyledLink>
							</Typography>
						</Stack>
					</TableCell>
				)}
				<TableCell>{contract.title}</TableCell>
				<TableCell>{contract.value}</TableCell>
				<TableCell>{contract.length}</TableCell>
				<TableCell align="right" style={{ width: 128 }}>
					{children}
				</TableCell>
			</TableRow>
		</>
	);
}

export default ContractTable;
