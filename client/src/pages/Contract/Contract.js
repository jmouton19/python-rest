import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Grid,
	TableRow,
	Stack,
	AvatarGroup,
	Tooltip,
} from "@mui/material";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { devicons } from "../../utils/mapLanguageToIcon";
import { fetchSingleContract, fetchAppliedDevelopers, closeContract } from "../../utils/apiCalls";

function Contract() {
	const contract_id = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
	const [contract, setContract] = useState({});
	const [developers, setDevelopers] = useState([]);

	useEffect(() => {
		fetchSingleContract(contract_id).then((data) => {
			setContract(data);
			fetchAppliedDevelopers(contract_id).then((data) => {
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
												<Stack spacing={3} padding={2}>
													<Typography variant="h4" color="primary" align="left">
														{contract.title}
													</Typography>
													<Stack>
														<Typography variant="caption">Duration:</Typography>
														<Typography variant="body">
															{contract.length} months
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">Value:</Typography>
														<Typography variant="body">
															R {contract.value}
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">
															Description:
														</Typography>
														<Typography variant="body">
															{contract.description}
														</Typography>
													</Stack>
												</Stack>
											</Paper>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12} md={8}>
									<TableContainer>
										<Table stickyHeader size="small">
											<TableHead>
												<TableRow>
													<TableCell align="center" colSpan={4}>
														<Typography
															align="center"
															variant="h5"
															id="tableTitle"
															component="div"
															xs={12}
														>
															Applicants
														</Typography>
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{developers.map((developer) => (
													<TableRow key={developer.name}>
														<TableCell>
															<Link
																to={`/profile/developer/${developer.username}`}
															>
																<Avatar
																	sx={{ width: 40, height: 40 }}
																	src={developer.avatar}
																></Avatar>
															</Link>
														</TableCell>
														<TableCell>
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
														</TableCell>
														<TableCell>
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
														</TableCell>
														<TableCell align="right">
															<Button onClick={() => {
																closeContract(developer["username"], contract_id).then(() => console.log("test"));
															}}>
																Accept
															</Button>
														</TableCell>
													</TableRow>
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
