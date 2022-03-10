import React from "react";
import { Typography, TableCell, Stack, Avatar, TableRow } from "@mui/material";

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
							<Typography>{contract.company_name}</Typography>
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
