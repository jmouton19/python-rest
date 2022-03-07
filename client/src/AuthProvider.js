/* eslint-disable no-unreachable */
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://cs334proj1group8.herokuapp.com";

const AuthContext = createContext();
const UserContext = createContext();
const LogoutContext = createContext();
const CheckUsernameContext = createContext();
const CheckEmailContext = createContext();
const LoginContext = createContext();
const LoadUserProfileContext = createContext();
const CheckPasswordContext = createContext();

import { fetchUserProfile, checkPassword } from "./utils/utils";

export function useAuth() {
	return useContext(AuthContext);
}

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
	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

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
						.then(navigate("/"))
						.catch((err) => console.error(err));

					resolve(true);
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
					setAuth(true);
				})
				.catch((err) => console.error(err));
		});
	}

	function logout() {
		setUser(null);
		setAuth(false);
	}

	return (
		<AuthContext.Provider value={auth}>
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
		</AuthContext.Provider>
	);
}

export default AuthProvider;
