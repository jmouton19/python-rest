import { Avatar, Stack, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../StyledTable";

import React from "react";
import StyledLink from "../../components/StyledLink";

function ContractTable({ contract, children, viewUser }) {
	return (
		<>
			<StyledTableRow key={contract.contract_id}>
				{viewUser.userType == "developer" && (
					<StyledTableCell>
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
					</StyledTableCell>
				)}
				<StyledTableCell>{contract.title}</StyledTableCell>
				<StyledTableCell>{contract.value}</StyledTableCell>
				<StyledTableCell>{contract.length}</StyledTableCell>
				<StyledTableCell align="right" style={{ width: 128 }}>
					{children}
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
}

export default ContractTable;
