const fs = require("fs");
const axios = require("axios");
const process = require("process");

function cat(file) {
	fs.readFile(file, "utf8", (error, text) => {
		if (error) {
			console.log(`Error reading ${file}:`);
			console.log(error);
			process.kill(1);
		}
		handleOutput(text, out);
	});
}

async function webCat(url) {
	try {
		const res = await axios.get(url);
		handleOutput(res.data, out);
	} catch (error) {
		console.log(`Error fetching ${url}:`);
		console.log(
			`Request failed with status code ${error.response.status} ${error.response.statusText}`
		);
	}
}

function handleOutput(text, out) {
	if (out) {
		fs.writeFile(out, text, "utf8", (error) => {
			if (error) {
				console.log(`Unable to write ${out}:`);
				console.log(error);
				process.kill(1);
			}
		});
	} else {
		console.log(text);
	}
}

const args = process.argv.slice(2);

const out = args[0] === "--out" ? args[1] : false;
const path = out ? args[2] : args[0];

if (path.substring(0, 4) === "http") {
	webCat(path);
} else {
	cat(path);
}
