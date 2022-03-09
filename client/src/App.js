import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AuthProvider, { useUser } from "./AuthProvider";
import Profile from "./pages/Profile/Profile";
import Contracts from "./pages/Contracts/Contracts";
import About from "./pages/About/About";
import AddContract from "./pages/AddContract/AddContract";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fe5800",
			g1: "#676767",
			g2: "#808080",
			g3: "#939393",
			g4: "#616366",
			g5: "#c1c3c7",
		},
		text: {
			dark: "#0d0d0d",
			light: "#ffffff",
		},
		//TRY: #c3e1e5 | #beced0 | #d9d3d1 | #b6a7a3 |  #e95e10 |  #a33301
		//OLD orange: #EF5B25
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
					<ThemeProvider theme={theme}>
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
							<Route path="/signup" element={<SignUp />} />
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/about" element={<About />} />
						</Routes>
					</ThemeProvider>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
