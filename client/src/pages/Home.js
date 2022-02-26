import React from "react";
import { useSimulateLogin } from "../AuthProvider";
import "./Home.css";

function Home() {
	const simulateLogin = useSimulateLogin();

	return (
		<React.Fragment classname="App">
			<header className="App-header">
				<button onClick={simulateLogin}>Simulate Login</button>
			</header>
		</React.Fragment>
	);
}

export default Home;
