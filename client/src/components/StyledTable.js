import { TableCell, TableRow, alpha } from "@mui/material";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableRow = styled(TableRow)(() => ({
	"&:nth-of-type(odd)": {},
	"&:nth-of-type(even)": {},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: alpha(theme.palette.primary.main, 0.4),
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
