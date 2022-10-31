const fs = require("fs");
const axios = require("axios");
const process = require("process");

function cat(file) {
	fs.readFile(file, "utf8", (error, data) => {
		if (error) {
			console.log(`Error reading ${file}:`);
			console.log(error);
			process.kill(1);
		}
		console.log(data);
	});
}

async function webCat(url) {
	try {
		const res = await axios.get(url);
		console.log(res.data);
	} catch (error) {
		console.log(`Error fetching ${url}:`);
		console.log(
			`Request failed with status code ${error.response.status} ${error.response.statusText}`
		);
	}
}

const args = process.argv.slice(2);
for (let arg of args) {
	if (arg.substring(0, 4) === "http") {
		webCat(arg);
	} else {
		cat(arg);
	}
}
