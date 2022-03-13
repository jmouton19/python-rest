export function mapUserProfileFromDBToFrontend(userType, userData) {
	let newUserData;

	if (userType == "developer") {
		newUserData = {
			userType,
			avatarUrl: userData.avatar,
			developerID: userData.developer_id,
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

export function deepEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		const areObjects = isObject(val1) && isObject(val2);
		if (
			(areObjects && !deepEqual(val1, val2)) ||
			(!areObjects && val1 !== val2)
		) {
			return false;
		}
	}
	return true;
}
function isObject(object) {
	return object != null && typeof object === "object";
}

export const currencyFormatter = new Intl.NumberFormat("en-ZA", {
	style: "currency",
	currency: "ZAR",
	currencySign: "accounting",
	minimumFractionDigits: 0,
	useGrouping: "true"
});
