import React from "react";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	Container,
	Paper,
	Chip,
	//Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	//TableRow,
	//Typography,
	Grid,
	TableRow,
	Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import DevIcon from "devicon-react-svg";
//import { useNavigate} from "react-router-dom";

function Contract() {
	//const navigate = useNavigate();

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

	const contract = {
		company_avatar: "https://i.ibb.co/BVJnV77/9ef54bf91300.webp",
		company_id: 5,
		company_name: "Goggle",
		contract_id: 5,
		date_posted: "Tue, 08 Mar 2022 14:29:42 GMT",
		description: "Do my frontend",
		length: 4,
		open: true,
		remote: true,
		title: "Disney Website Redesign",
		value: 10000,
	};

	const developers = [
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "bobby ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/56tLt0w/eede0eb822e6.jpg",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
		{
			avatar: "https://i.ibb.co/bdHVmcY/0062842c93dc.png",
			developer_id: 27,
			developer_languages: {
				Java: 3,
				"Objective-C": 7,
				JavaScript: 9,
				Lua: 12,
				Go: 9,
			},
			email: "nicolvisser@yahoo.com",
			github_url: null,
			linkedin_url: null,
			name: "Nicol ",
			surname: "Visser",
			username: "nicolvisser",
		},
	];

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
													<Typography variant="h5" color="primary" align="left">
														{contract.title}
													</Typography>
													<Stack>
														<Typography variant="caption">Duration:</Typography>
														<Typography variant="body" align="flex-start">
															{contract.length} months
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">Value:</Typography>
														<Typography variant="body" align="flex-start">
															R {contract.value}
														</Typography>
													</Stack>
													<Stack>
														<Typography variant="caption">
															Description:
														</Typography>
														<Typography variant="body" align="flex-start">
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
															fullwidth
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
															<DevIcon icon="react"/>
														</TableCell>
											
														<TableCell>
															{Object.keys(developer.developer_languages).map(
																(language) => (
																	<Chip key={language} size="small" label={language}/>
																)
															)}
														</TableCell>
														<TableCell align="right">
															<Button >Accept</Button>
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
