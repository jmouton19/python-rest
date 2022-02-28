import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const baseUrl = "https://cs334proj1group8.herokuapp.com";

const AuthContext = createContext();
const UserCredentialsContext = createContext();
const SimulateLoginContext = createContext();
const LogoutContext = createContext();
const CheckUsernameContext = createContext();
const CheckEmailContext = createContext();

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

export function useCheckUsername() {
	return useContext(CheckUsernameContext);
}

export function useCheckEmail() {
	return useContext(CheckEmailContext);
}

function AuthProvider({ children }) {
	const [, setAuth] = useState(null);
	const [user, setUser] = useState(null);

	async function checkUsername(username) {
		const url = `${baseUrl}/api/developer?username=${username}`;
		try {
			await axios.get(url);
		} catch (error) {
			return false;
		}
		return true;
	}

	async function checkEmail(email) {
		const url = `${baseUrl}/api/developer?email=${email}`;
		try {
			await axios.get(url);
		} catch (error) {
			return false;
		}
		return true;
	}

	function simulateLogin() {
		setUser({
			username: "johndoen",
			firstName: "John",
			lastName: "Doe",
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
						<CheckUsernameContext.Provider value={checkUsername}>
							<CheckEmailContext.Provider value={checkEmail}>
								{children}
							</CheckEmailContext.Provider>
						</CheckUsernameContext.Provider>
					</LogoutContext.Provider>
				</SimulateLoginContext.Provider>
			</UserCredentialsContext.Provider>
		</AuthContext.Provider>
	);
}

export default AuthProvider;
