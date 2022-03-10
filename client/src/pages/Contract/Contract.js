import React from "react";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	Container,
	Paper,
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
} from "@mui/material";
import { Link } from "react-router-dom";
//import { useNavigate} from "react-router-dom";

function Contract() {
	//const navigate = useNavigate();

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
		title: "frontend design",
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
			<Container maxWidth="lg">
				<Grid container direction="column" alignItems="stretch" spacing={2} padding={4}>
					<Typography variant="h3" color="primary" align="center">
						{contract.title}
					</Typography>
					<Grid item xs={4}>
						<Grid container direction="row" alignItems="stretch" spacing={2} padding={1}>
							<Grid item xs={4}>
								<Paper elevation={4} padding={1}>
									<Grid container direction="column" alignItems="stretch" padding={1}>
										<Grid item xs={4}>
											<Typography variant="h6"  align="flex-start">
												Duration: {contract.length} months
											</Typography>
											<Typography variant="h6"  align="flex-start">
												Value: R{contract.value}
											</Typography>
											<Typography variant="h6"  align="flex-start">
												Description: {contract.description}
											</Typography>
										</Grid>	

									</Grid>
								</Paper>	
							</Grid>	
							<Grid item xs={8}>
								<Paper elevation={4} overflow = 'hidden'>
									<TableContainer sx={{ maxHeight: 440 }}>
										<Table stickyHeader aria-label="sticky table">
											<TableHead>
												<TableRow>
													<TableCell align = 'center' colSpan={4}>
														<Typography
															fullwidth
															align = 'center'
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
																							
												{developers.map(
													(developer)=>(
														<TableRow key = {developer.name} >
															<TableCell>
																<Avatar
																	sx={{ width: 50, height: 50 }}
																	src={developer.avatar}
																></Avatar>
															</TableCell>
															<TableCell>
																<Typography>{developer.name} {developer.surname}</Typography>
															</TableCell>
															<TableCell>
																<Button 
																	component={Link}
																	to={`/profile/developer/${developer.username}`}
																>
																	View profile
																</Button>
															</TableCell>
															<TableCell>
																<Button>	
																	accept
																</Button>
															</TableCell>
															
														</TableRow>
													)
												)}
											
											</TableBody>
										</Table>	
									</TableContainer>
								</Paper>	
							</Grid>	
						</Grid>	
					</Grid>

					
				</Grid>	
			</Container>

		</React.Fragment>
		
	);
}

export default Contract;