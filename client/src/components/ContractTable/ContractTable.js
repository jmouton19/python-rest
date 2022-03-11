import React from "react";
import { Typography, TableCell, Stack, Avatar, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

function ContractTable({ contract, children, viewUser }) {

	const StyledLink = styled(Link)`
		text-decoration: none;

		&:focus,
		&:hover,
		&:visited,
		&:link,
		&:active {
			color: black;
		}
	`;

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
