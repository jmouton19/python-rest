import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();
const UserCredentialsContext = createContext();
const SimulateLoginContext = createContext();
const LogoutContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function useUserCredentials() {
	return useContext(UserCredentialsContext);
}

export function useSimulateLogin() {
	return useContext(SimulateLoginContext);
}

export function useLogout() {
	return useContext(LogoutContext);
}

function AuthProvider({ children }) {
	const [, setAuth] = useState(null);
	const [user, setUser] = useState(null);

	function simulateLogin() {
		setUser({
			username: "johndoen",
			email: "johndoe@gmail.com",
			password: "12341234",
			userType: "developer",
			avatarUrl: "https://i.ibb.co/d5n2XtN/00e7210667fb.jpg",
			programmingLanguages: ["Python", "JavaScript", "Java", "C", "R"],
		});
		setAuth(true);
	}

	function logout() {
		setUser(null);
		setAuth(false);
	}

	return (
		<AuthContext.Provider value={user}>
			<UserCredentialsContext.Provider value={user}>
				<SimulateLoginContext.Provider value={simulateLogin}>
					<LogoutContext.Provider value={logout}>
						{children}
					</LogoutContext.Provider>
				</SimulateLoginContext.Provider>
			</UserCredentialsContext.Provider>
		</AuthContext.Provider>
	);
}

export default AuthProvider;
