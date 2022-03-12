export const sortByValue = (contracts, descending) => {
	if (descending)
		contracts.sort((contract1, contract2) => contract2.value - contract1.value);
	else
		contracts.sort((contract1, contract2) => contract1.value - contract2.value);
};

export const sortByDuration = (contracts, descending) => {
	if (descending)
		contracts.sort(
			(contract1, contract2) => contract2.length - contract1.length
		);
	else
		contracts.sort(
			(contract1, contract2) => contract1.length - contract2.length
		);
};

export const sortByDate = (contracts, descending) => {
	if (descending)
		contracts.sort((contract1, contract2) => {
			return new Date(contract2.date_posted) - new Date(contract1.date_posted);
		});
	else
		contracts.sort((contract1, contract2) => {
			return new Date(contract1.date_posted) - new Date(contract2.date_posted);
		});
};

export const groupByOpen = (contracts) => {
	return contracts.filter((contract) => contract.open);
};

export const groupByClosed = (contracts) => {
	return contracts.filter((contract) => !contract.open);
};

export const groupByAccepted = (contracts, developer_id) => {
	return contracts.filter((contract) => contract.developer_id == developer_id);
};

export const groupByApplied = (contracts) => {
	return contracts.filter((contract) => contract.developer_id == null);
};

export const totalMoney = (contracts) => {
	return contracts.reduce((total, contract) => contract.value + total, 0);
};

export const filterBySearchValue = (searchValue, companies, developers) => {
	let companyResults = companies.filter(
		(company) =>
			company.company_name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
	);
	let developerResults = developers.filter(
		(developer) =>
			developer.username.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
	);

	companyResults = companyResults.map((company) => {
		return { userType: "company", username: company.company_name, ...company };
	});

	developerResults = developerResults.map((developer) => {
		return { userType: "developer", ...developer };
	});

	const results = companyResults.concat(developerResults);
	return results;
};
