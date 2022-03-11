import axios from "axios";
import { mapUserProfileFromDBToFrontend } from "./utils";

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

export async function checkIfUniqueEmail(email) {
	const url = `${baseUrl}/api/email/${email}`;
	return new Promise((resolve) => {
		axios.get(url).then((res) => {
			if (res.data.success) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}

export async function checkIfUniqueUsername(userType, username) {
	const url = `${baseUrl}/api/${userType}/${username}`;
	return new Promise((resolve) => {
		axios.get(url).then((res) => {
			if (res.data.success) {
				resolve(false);
			} else {
				resolve(true);
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

export async function fetchAllOpenContracts() {
	const url = `${baseUrl}/api/contract`;
	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			const { success } = res.data;
			if (success) {
				resolve(res.data.contracts);
			} else {
				reject(res);
			}
		});
	});
}

export async function deleteContract(contract_id) {
	const url = `${baseUrl}/api/contract/${contract_id}`;
	return new Promise((resolve, reject) => {
		axios.delete(url).then((res) => {
			if (res.data.success) {
				resolve(true);
			} else {
				reject();
			}
		});
	});
}

export async function applyToContract(developerUsername, contract_id) {
	const url = `${baseUrl}/api/developer/${developerUsername}/application`;
	const data = { contract_id };

	return new Promise((resolve, reject) => {
		axios.post(url, data).then((res) => {
			if (res.data.success) {
				resolve(true);
			} else {
				reject();
			}
		});
	});
}

export async function fetchSingleContract(contract_id) {
	const url = `${baseUrl}/api/contract/${contract_id}`;

	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			if (res.data.success) {
				resolve(res.data.contract);
			} else {
				reject();
			}
		});
	});
}

export async function fetchAppliedDevelopers(contract_id) {
	const url = `${baseUrl}/api/contract/${contract_id}/developer`;

	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			if (res.data.success) {
				resolve(res.data.developers);
			} else {
				reject();
			}
		});
	});
}

export async function cancelApplication(developerUsername, contract_id) {
	const url = `${baseUrl}/api/developer/${developerUsername}/application/${contract_id}`;

	return new Promise((resolve, reject) => {
		axios.delete(url).then((res) => {
			if (res.data.success) {
				resolve(true);
			} else {
				reject();
			}
		});
	});
}

export async function fetchDevelopersContracts(developerUsername) {
	const url = `${baseUrl}/api/developer/${developerUsername}/application`;
	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			const { success } = res.data;
			if (success) {
				resolve(res.data.contracts);
			} else {
				reject(res);
			}
		});
	});
}

export async function fetchCompanysContracts(companyUsername) {
	const url = `${baseUrl}/api/company/${companyUsername}/contract`;
	return new Promise((resolve, reject) => {
		axios.get(url).then((res) => {
			const { success } = res.data;
			if (success) {
				resolve(res.data.contracts);
			} else {
				reject(res);
			}
		});
	});
}

export async function signUp(userType, data) {
	const url = `${baseUrl}/api/${userType}`;
	return new Promise((resolve, reject) => {
		axios.post(url, data).then((res) => {
			const { success } = res.data;
			if (success) {
				resolve(true);
			} else {
				reject(res);
			}
		});
	});
}

export async function updateUser(userType, username, data) {
	const url = `${baseUrl}/api/${userType}/${username}`;
	return new Promise((resolve, reject) => {
		axios.put(url, data).then((res) => {
			if(res.data.success) {
				resolve(res);
			} else {
				reject(res.data.message);
			}
		});
	});
}

export async function deleteUser(userType, username) {
	const url = `${baseUrl}/api/${userType}/${username}`;
	return new Promise((resolve, reject) => {
		axios.delete(url).then((res) => {
			if(res.data.success) {
				resolve(true);
			} else {
				reject(res.data.message);
			}
		});
	});
}

export async function closeContract(developerUsername, contract_id) {
	const data = {username: developerUsername};
	const url = `${baseUrl}/api/contract/${contract_id}`;
	return new Promise((resolve, reject) => {
		axios.put(url, data).then((res) => {
			if(res.data.success) {
				resolve(true);
			} else {
				reject(res.data.message);
			}
		});
	});
}