export const sortByValue = (contracts, descending) => {
	console.log(contracts);
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
			console.log(contract2);
			return new Date(contract2.date_posted) - new Date(contract1.date_posted);
		});
	else
		contracts.sort((contract1, contract2) => {
			console.log(contract2);
			return new Date(contract1.date_posted) - new Date(contract2.date_posted);
		});
};
