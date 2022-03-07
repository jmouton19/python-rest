import axios from "axios";

const baseUrl = "https://cs334proj1group8.herokuapp.com";

export async function fetchUserProfile(userType, username) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${baseUrl}/api/${userType.toLowerCase()}/${username}`)
			.then((res) => {
				if (res.data.success) {
					const newData = mapUserProfileFromDBToFrontend(
						userType,
						res.data[userType]
					);
					resolve(newData);
				} else {
					reject(res.data.message);
				}
			});
	});
}

export async function checkPassword(email, password) {
	const url = `${baseUrl}/api/login`;
	const data_POST = {
		email,
		password,
	};
	return new Promise((resolve, reject) => {
		axios.post(url, data_POST).then((res) => {
			const { success } = res.data;
			if (success) {
				resolve(true);
			} else {
				reject(res);
			}
		});
	});
}

function mapUserProfileFromDBToFrontend(userType, userData) {
	let newUserData;

	if (userType == "developer") {
		newUserData = {
			userType,
			avatarUrl: userData.avatar,
			developerID: userData.developerID,
			email: userData.email,
			githubURL: userData.github_url,
			linkedInURL: userData.linkedin_url,
			firstName: userData.name,
			lastName: userData.surname,
			username: userData.username,
			programmingLanguages: userData.developer_languages,
		};
	} else {
		newUserData = {
			userType,
			avatarUrl: userData.avatar,
			companyID: userData.developer_id,
			username: userData.company_name,
			email: userData.email,
			industry: userData.industry,
		};
	}

	return newUserData;
}
