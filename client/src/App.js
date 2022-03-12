import AuthProvider, { useUser } from "./AuthProvider";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AddContract from "./pages/AddContract/AddContract";
import AppBar from "./components/AppBar/AppBar";
import Contract from "./pages/Contract/Contract";
import Contracts from "./pages/Contracts/Contracts";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import React from "react";
import SignUp from "./pages/SignUp/SignUp";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#fe5800",
		},
	},
});

// source: https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function PrivateRoute({ children }) {
	const user = useUser();
	const location = useLocation();

	if (user) {
		return children;
	} else {
		return <Navigate to={`/login?redirect=${location.pathname}`} />;
	}
}

function App() {
	return (
		<>
			<Router>
				<AuthProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<AppBar />
						<Routes>
							<Route
								path="/profile/:userType/:username"
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
							<Route
								path="/contract/:contract_id"
								element={
									<PrivateRoute>
										<Contract />
									</PrivateRoute>
								}
							/>
							<Route path="/signup" element={<SignUp />} />
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</ThemeProvider>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
