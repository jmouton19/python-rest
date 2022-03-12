import * as React from "react";

import { Paper } from "@mui/material";

export default function SearchMenu({ open, searchValue }) {
	if (open)
		return (
			<Paper
				elevation={4}
				sx={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					maxWidth: "90%",
					maxHeight: "90%",
					width: "50%",
					height: "50%",
				}}
			>
				{searchValue}
			</Paper>
		);

	return null;
}
