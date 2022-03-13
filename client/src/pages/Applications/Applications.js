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
	Tooltip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../../components/StyledTable";
import {
	closeContract,
	fetchAppliedDevelopers,
	fetchSingleContract,
} from "../../utils/apiCalls";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import StyledLink from "../../components/StyledLink";
import Typography from "@mui/material/Typography";
import { currencyFormatter } from "../../utils/utils";
import { devicons } from "../../utils/mapLanguageToIcon";

function Contract() {
	const params = useParams();
	const [contract, setContract] = useState({});
	const [developers, setDevelopers] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		fetchSingleContract(params.contract_id)
			.then((data) => {
				setContract(data);
				fetchAppliedDevelopers(params.contract_id).then((data) => {
					setDevelopers(data);
				});
			})
			.catch((err) => console.error(err));
	}

	console.log({ contract, developers });

	if (contract === null || developers == null) {
		return <LoadingPage />;
	}

	console.log(developers);
	console.log(contract);

	return (
		<React.Fragment>
			<Container>
				<Paper elevation={4} sx={{ mt: 5 }}>
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
								<Grid item xs={12}>
									<Stack alignItems="center">
										<Typography variant="h4" align="left" color="primary">
											{contract.title}
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={12} md={4}>
									<Grid
										container
										direction="column"
										alignItems="stretch"
										spacing={1}
										padding={1}
									>
										<Grid item xs={4}>
											<Paper>
												<Stack spacing={2} padding={2}>
													<Stack>
														<Typography variant="caption">Duration:</Typography>
														<Typography variant="body">
															{contract.length} months
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">Value:</Typography>
														<Typography variant="body">
															{currencyFormatter.format(contract.value)}
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">
															Description:
														</Typography>
														<Typography variant="caption">
															{contract.description}
														</Typography>
													</Stack>
													{contract.username && (
														<Stack>
															<Typography variant="caption">
																Accepted Developer:
															</Typography>
															<StyledLink
																to={`/profile/developer/${contract.username}`}
															>
																<Typography>{contract.username}</Typography>
															</StyledLink>
														</Stack>
													)}
												</Stack>
											</Paper>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} md={8}>
									<TableContainer sx={{ marginTop: 1 }}>
										<Table stickyHeader size="small">
											<TableHead>
												<StyledTableRow>
													<StyledTableCell align="center" colSpan={4}>
														<Typography
															align="center"
															variant="h6"
															xs={12}
															color
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
															<Typography variant="body" color="text">
																<a
																	style={{
																		color: "white",
																		textDecoration: "none",
																	}}
																	href={`/profile/developer/${developer.username}`}
																>
																	{developer.name} {developer.surname}
																</a>
															</Typography>
															<Button
																color="primary"
																sx={{ textTransform: "none" }}
															></Button>
														</StyledTableCell>
														<StyledTableCell>
															<AvatarGroup variant="round" spacing={0}>
																{Object.keys(developer.developer_languages).map(
																	(language, experience) => (
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
																	)
																)}
															</AvatarGroup>
														</StyledTableCell>
														<StyledTableCell align="right">
															{contract.username ? (
																contract.username === developer.username ? (
																	"Accepted"
																) : (
																	"Denied"
																)
															) : (
																<Button
																	variant="contained"
																	onClick={() => {
																		closeContract(
																			developer["username"],
																			params.contract_id
																		).then(() => {
																			getData();
																		});
																	}}
																>
																	Accept
																</Button>
															)}
														</StyledTableCell>
													</StyledTableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</React.Fragment>
	);
}

export default Contract;
