let availableContractIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let availableCompanyNames = [
	"Apple",
	"Microsoft",
	"Google",
	"Amazon",
	"Facebook",
	"Netflix",
	"Youtube",
	"Takealot",
	"Heroku",
	"Netlify",
	"GitKraken",
];
let availableDeveloperIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function shuffleArray(array) {
	let curId = array.length;
	// There remain elements to shuffle
	while (0 !== curId) {
		// Pick a remaining element
		let randId = Math.floor(Math.random() * curId);
		curId -= 1;
		// Swap it with the current element.
		let tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
}

availableContractIDs = shuffleArray(availableContractIDs);
availableCompanyNames = shuffleArray(availableCompanyNames);
availableDeveloperIDs = shuffleArray(availableDeveloperIDs);

function generateRandomDate() {
	const date = new Date();
	date.setFullYear(2021);
	date.setMonth(Math.floor(Math.random() * 12) + 1);
	date.setDate(Math.floor(Math.random() * 28) + 1);
	date.setHours(Math.floor(Math.random() * 24));
	date.setMinutes(Math.floor(Math.random() * 60));
	date.setSeconds(Math.floor(Math.random() * 60));
	return date;
}

const sampleDescriptions = [
	"The project is about the creation of a new C++ library that allows you to do common things like adding a file to a filesystem, using the filesystem to manipulate files, etc. This is the first in a series of programming challenges that will be covered.",
	"Involves adding a new game mode to the game that I am designing. I'll be posting the code for this project here once it is done and I can post the finished project. If you are interested in helping I would appreciate it very much!",
	"This contract is about one small part of the data. The data is not important, and you don't need to know it, but you can use it as a learning tool. You can find more information about the topic in the Help Center.",
	"The contract involves building the web service that would make it easy to find information about some people and others. The first part is in the web service section. The next part is in the database section.",
	"We want to develop mobile applications using WebSocket. The intent is to implement an API that is a little different from TCP or UDP in that it uses both UDP and TCP.",
];

function generateSampleContract() {
	const sampleEntryFromContractsTable = {
		contract_id: availableContractIDs.pop(),
		company_name: availableCompanyNames.pop(),
		developer_id: availableDeveloperIDs.pop(),
		date_posted: generateRandomDate(),
		description:
			sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)],
		length: Math.floor(Math.random() * 12) + 1,
		office: Math.random() < 0.5,
		open: Math.random() < 0.5,
		remote: Math.random() < 0.5,
		value: 5000 + Math.floor(Math.random() * 20) * 500,
	};

	return sampleEntryFromContractsTable;
}

function generateSampleContractList(num) {
	const data = [];
	for (let index = 0; index < num; index++) {
		data.push(generateSampleContract());
	}
	return data;
}

export const sampleData = generateSampleContractList(5);
