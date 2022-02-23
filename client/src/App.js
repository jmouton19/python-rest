import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";

function App() {
	return (
		<React.Fragment>
			<AppBar />
			<Router>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;
