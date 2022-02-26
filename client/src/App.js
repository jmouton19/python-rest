import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AuthProvider from "./AuthProvider";
import Profile from "./pages/Profile/Profile";

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<AppBar />
					<Routes>
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
