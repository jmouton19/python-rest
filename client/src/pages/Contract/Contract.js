import React from "react";
import Typography from "@mui/material/Typography";
import {
	//Avatar,
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

function Contract() {

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
	];

	return (
		<React.Fragment>
			<Container>
				<Grid container direction="column" alignItems="stretch" spacing={2} padding={4}>
					<Typography variant="h3" color="primary" align="center">
						{contract.title}
					</Typography>
					<Grid item xs={4}>
						<Grid container direction="row" alignItems="stretch" spacing={2} padding={1}>
							<Grid item xs={4}>
								<Paper elevation={4} padding={1}>
									<Grid container direction="column" alignItems="stretch" spacing={1} padding={1}>
										<Grid item xs={4}>
											<Typography variant="h6"  align="flex-start">
												Duration: {contract.length} months
											</Typography>
											<Typography variant="h6"  align="flex-start">
												Value: R{contract.value}
											</Typography>
											<Typography variant="h6"  align="flex-start">
												Descrtion: {contract.description}
											</Typography>
										</Grid>	

									</Grid>
								</Paper>	
							</Grid>	
							<Grid item xs={8}>
								<Paper elevation={4}>
									<TableContainer>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>
														<Typography variant="h5">
																Devvname
														</Typography>
													</TableCell>
													<TableCell>
														<Typography variant="h5">view profile</Typography>
													</TableCell>
													<TableCell>
														<Typography variant="h5">accept</Typography>
													</TableCell>

												</TableRow>											
												{developers.map(
													(developer)=>(
														<TableRow key = {developer.name}>
															<TableCell>
																<Typography>{developer.name}</Typography>
															</TableCell>
															
														</TableRow>
													)
												)}
											</TableHead>
											<TableBody></TableBody>
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