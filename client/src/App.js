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
import Applications from "./pages/Applications/Applications";
import Contracts from "./pages/Contracts/Contracts";
import CssBaseline from "@mui/material/CssBaseline";
import Forbidden from "./pages/Forbidden";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import NotificationProvider from "./NotificationProvider";
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
function PrivateRoute({ children, roles }) {
	const user = useUser();
	const location = useLocation();

	if (user && !roles.includes(user.userType)) {
		return <Forbidden />;
	}

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
						<NotificationProvider>
							<CssBaseline />
							<AppBar />
							<Routes>
								<Route
									path="/profile/:userType/:username"
									element={
										<PrivateRoute roles={["developer", "company"]}>
											<Profile />
										</PrivateRoute>
									}
								/>
								<Route
									path="/contracts"
									element={
										<PrivateRoute roles={["developer", "company"]}>
											<Contracts />
										</PrivateRoute>
									}
								/>
								<Route
									path="/addcontract"
									element={
										<PrivateRoute roles={["developer", "company"]}>
											<AddContract />
										</PrivateRoute>
									}
								/>
								<Route
									path="/applications/:contract_id"
									element={
										<PrivateRoute roles={["company"]}>
											<Applications />
										</PrivateRoute>
									}
								/>
								<Route path="/signup" element={<SignUp />} />
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</NotificationProvider>
					</ThemeProvider>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
