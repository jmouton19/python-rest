import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {

	const [data, setData] = useState({});

	const requestURL = "/api/getData/";

	function getData() {
		fetch(requestURL).then(res => res.json()).then((data) => {
			console.log(data);
			setData(data);
		}, (error) => { console.log(error); });
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
                    Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
                    Learn React
				</a>
				<br/>
				<button onClick={getData}>Get Data</button>
				<p>{JSON.stringify(data)}</p>
			</header>
		</div>
	);
}

export default App;
