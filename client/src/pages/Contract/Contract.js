import {
	Avatar,
	AvatarGroup,
	Button,
	Container,
	Grid,
	Paper,
	Stack,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
	closeContract,
	fetchAppliedDevelopers,
	fetchSingleContract,
} from "../../utils/apiCalls";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Typography from "@mui/material/Typography";
import { devicons } from "../../utils/mapLanguageToIcon";
import { alpha,styled } from "@mui/material/styles";
import { useUser } from "../../AuthProvider";
import { useTheme } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: alpha(theme.palette.primary.g6,0.7),
	},
	"&:nth-of-type(even)": {
		backgroundColor: alpha(theme.palette.primary.g6,0.4),
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.g5,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

function Contract() {
	const theme = useTheme();
	const params = useParams();
	const [contract, setContract] = useState({});
	const [developers, setDevelopers] = useState([]);
	const authUser = useUser();

	useEffect(() => {
		fetchSingleContract(params.contract_id)
			.then((data) => {
				setContract(data);
				fetchAppliedDevelopers(params.contract_id).then((data) => {
					setDevelopers(data);
				});
			})
			.catch((err) => console.log(err));
	}, []);

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

	if (contract === null || developers == null) {
		return <LoadingPage />;
	}

	return (
		<React.Fragment>
			<Container>
				<Paper
					elevation={4}
					sx={{ mt: 5, backgroundColor: theme.palette.primary.g5 }}
				>
					<Grid
						container
						direction="column"
						alignItems="stretch"
						spacing={2}
						padding={4}
					>
						<Grid item xs={4}>
							<Grid
								container
								direction="row"
								alignItems="stretch"
								spacing={2}
								padding={1}
							>
								<Grid item xs={12} md={4}>
									<Grid
										container
										direction="column"
										alignItems="stretch"
										spacing={1}
										padding={1}
									>
										<Grid item xs={4}>
											<Paper sx={{ backgroundColor: theme.palette.primary.g4 }}>
												<Stack spacing={3} padding={2}>
													<Typography
														variant="h4"
														color={theme.palette.text.light}
														align="left"
													>
														{contract.title}
													</Typography>
													<Stack>
														<Typography
															variant="caption"
															color={theme.palette.text.light}
														>
															Duration:
														</Typography>
														<Typography
															variant="body"
															color={theme.palette.text.light}
														>
															{contract.length} months
														</Typography>
													</Stack>
													<Stack>
														<Typography
															variant="caption"
															color={theme.palette.text.light}
														>
															Value:
														</Typography>
														<Typography
															variant="body"
															color={theme.palette.text.light}
														>
															R {contract.value}
														</Typography>
													</Stack>
													<Stack>
														<Typography
															variant="caption"
															color={theme.palette.text.light}
														>
															Description:
														</Typography>
														<Typography
															variant="body"
															color={theme.palette.text.light}
														>
															{contract.description}
														</Typography>
													</Stack>
												</Stack>
											</Paper>
										</Grid>
									</Grid>
								</Grid>
								{authUser.userType == "developer" ? (
									<Grid item xs={12} md={8}>
										<Button
											onClick={() => {
												closeContract(
													authUser.username,
													params.contract_id
												).then(() => console.log("test"));
											}}
										>
											Accept
										</Button>
									</Grid>
								) : (
									<Grid item xs={12} md={8}>
										<TableContainer>
											<Table stickyHeader size="small">
												<TableHead>
													<StyledTableRow>
														<StyledTableCell align="center" colSpan={4}>
															<Typography
																align="center"
																variant="h5"
																id="tableTitle"
																component="div"
																xs={12}
																color={theme.palette.primary.main}
															>
																Applicants
															</Typography>
														</StyledTableCell>
													</StyledTableRow>
												</TableHead>
												<TableBody>
													{developers.map((developer) => (
														<StyledTableRow key={developer.name}>
															<StyledTableCell>
																<Link
																	to={`/profile/developer/${developer.username}`}
																>
																	<Avatar
																		sx={{ width: 40, height: 40 }}
																		src={developer.avatar}
																	></Avatar>
																</Link>
															</StyledTableCell>
															<StyledTableCell>
																<StyledLink
																	to={`/profile/developer/${developer.username}`}
																	style={{
																		textDecoration: "none",
																	}}
																>
																	<Typography sx={{ color: "primary" }}>
																		{developer.name} {developer.surname}
																	</Typography>
																</StyledLink>
															</StyledTableCell>
															<StyledTableCell>
																<AvatarGroup variant="round" spacing={0}>
																	{Object.keys(
																		developer.developer_languages
																	).map((language, experience) => (
																		<Tooltip
																			key={language}
																			title={`${language}: ${experience} \n ${
																				experience == 1 ? "Year" : "Years"
																			} Experience`}
																		>
																			<Avatar
																				sx={{
																					width: 25,
																					height: 25,
																					backgroundColor: "white",
																				}}
																				src={devicons[language]}
																			/>
																		</Tooltip>
																	))}
																</AvatarGroup>
															</StyledTableCell>
															<StyledTableCell align="right">
																<Button
																	variant="contained"
																	onClick={() => {
																		closeContract(
																			developer["username"],
																			params.contract_id
																		).then(() => console.log("test"));
																	}}
																>
																	Accept
																</Button>
															</StyledTableCell>
														</StyledTableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</Grid>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</React.Fragment>
	);
}

export default Contract;
