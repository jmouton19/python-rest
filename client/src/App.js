import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AuthProvider from "./AuthProvider";
import Profile from "./pages/Profile/Profile";
import Contracts from "./pages/Contracts/Contracts";
import About from "./pages/About/About";
import { useAuth } from "./AuthProvider";
import AddContract from "./pages/AddContract/AddContract";

// source: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function PrivateRoute({ children }) {
	const auth = useAuth();
	return auth ? children : <Navigate to="/login" />;
}

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<AppBar />
					<Routes>
						<Route
							path="/profile"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route
							path="/contracts"
							element={
								<PrivateRoute>
									<Contracts />
								</PrivateRoute>
							}
						/>
						<Route
							path="/addcontract"
							element={
								<PrivateRoute>
									<AddContract />
								</PrivateRoute>
							}
						/>
						<Route path="/signup" element={<SignUp />} />
						<Route path="/login" element={<Login />} />
						<Route path="/about" element={<About />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
