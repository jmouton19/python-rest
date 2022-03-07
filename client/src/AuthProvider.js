import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://cs334proj1group8.herokuapp.com";

const UserContext = createContext();
const LogoutContext = createContext();
const CheckUsernameContext = createContext();
const CheckEmailContext = createContext();
const LoginContext = createContext();
const LoadUserProfileContext = createContext();
const CheckPasswordContext = createContext();

import { fetchUserProfile, checkPassword } from "./utils/utils";

export function useUser() {
	return useContext(UserContext);
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

export function useLogin() {
	return useContext(LoginContext);
}

export function useLoadUserProfile() {
	return useContext(LoadUserProfileContext);
}

export function useCheckPassword() {
	return useContext(CheckPasswordContext);
}

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(JSON.parse(window.sessionStorage.getItem("kontra-user")));
	}, []);

	useEffect(() => {
		window.sessionStorage.setItem("kontra-user", JSON.stringify(user));
	}, [user]);

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

	async function login(email, password) {
		const url = `${baseUrl}/api/login`;
		const data_POST = {
			email,
			password,
		};

		return new Promise((resolve, reject) => {
			axios.post(url, data_POST).then((res) => {
				const { success, type: userType, name: username } = res.data;

				if (success) {
					loadUserProfile(userType.toLowerCase(), username)
						.then(() => resolve(true))
						.catch((err) => console.error(err));
				} else {
					reject(res);
				}
			});
		});
	}

	async function loadUserProfile(userType, username) {
		return new Promise((resolve) => {
			fetchUserProfile(userType, username)
				.then((data) => {
					resolve(data);
					setUser(data);
				})
				.catch((err) => console.error(err));
		});
	}

	function logout() {
		window.sessionStorage.clear();
		setUser(null);
	}

	return (
		<UserContext.Provider value={user}>
			<LogoutContext.Provider value={logout}>
				<CheckUsernameContext.Provider value={checkUsername}>
					<CheckEmailContext.Provider value={checkEmail}>
						<LoginContext.Provider value={login}>
							<LoadUserProfileContext.Provider value={loadUserProfile}>
								<CheckPasswordContext.Provider value={checkPassword}>
									{children}
								</CheckPasswordContext.Provider>
							</LoadUserProfileContext.Provider>
						</LoginContext.Provider>
					</CheckEmailContext.Provider>
				</CheckUsernameContext.Provider>
			</LogoutContext.Provider>
		</UserContext.Provider>
	);
}

export default AuthProvider;
