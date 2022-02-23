import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
