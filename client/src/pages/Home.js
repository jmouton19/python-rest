import React, { useState } from "react";
import "./Home.css";
import Button from "@mui/material/Button";

function Home() {
	const [data, setData] = useState({});

	const requestURL = "/api/getData/";

	function getData() {
		fetch(requestURL)
			.then((res) => res.json())
			.then(
				(data) => {
					console.log(data);
					setData(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}
	return (
		<React.Fragment className="App">
			<header className="App-header">
				<Button variant="contained" onClick={getData}>
                    Get Test Data from Back End
				</Button>
				<p>{JSON.stringify(data)}</p>
			</header>
		</React.Fragment>
	);
}

export default Home;