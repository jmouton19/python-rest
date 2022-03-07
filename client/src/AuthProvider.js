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

	function login(email, password) {
		const url = `${baseUrl}/api/login`;
		const data_POST = {
			email,
			password,
		};
		axios
			.post(url, data_POST)
			.then((res_POST) => {
				const { success, type: userType, name: username } = res_POST.data;

				if (success) {
					console.log(
						`${userType} with username, ${username}, was logged in successfully. User profile will now be retrieved...`
					);
					loadUserProfile(userType.toLowerCase(), username);
					navigate("/");

					return true;
				} else {
					console.log("Error! Showing response data:");
					console.log(res_POST);
				}
			})
			.catch((err) => console.log(err));
	}

	function loadUserProfile(userType, username) {
		axios
			.get(`${baseUrl}/api/${userType.toLowerCase()}/${username}`)
			.then((res_GET) => {
				const { success } = res_GET.data;
				if (success) {
					const userDataFromServer = res_GET.data[userType];

					let newUserData;

					if (userType == "developer") {
						newUserData = {
							userType,
							avatarUrl: userDataFromServer.avatar,
							developerID: userDataFromServer.developerID,
							email: userDataFromServer.email,
							githubURL: userDataFromServer.github_url,
							linkedInURL: userDataFromServer.linkedin_url,
							firstName: userDataFromServer.name,
							lastName: userDataFromServer.surname,
							username: userDataFromServer.username,
							programmingLanguages: {
								Python: 2,
								JavaScript: 4,
								Java: 3,
								C: 1,
								R: 5,
							},
						};
					} else {
						newUserData = {
							userType,
							avatarUrl: userDataFromServer.avatar,
							companyID: userDataFromServer.developer_id,
							username: userDataFromServer.company_name,
							email: userDataFromServer.email,
							industry: userDataFromServer.industry,
						};
					}

					setUser(newUserData);
					setAuth(true);
				} else {
					console.log("Error! Showing response data:");
					console.log(res_GET);
				}
			})
			.catch((err) => {
				console.log(err);
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
									{children}
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
