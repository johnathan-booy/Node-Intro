const fs = require("fs");
const process = require("process");

function cat(file) {
	fs.readFile(file, "utf8", (error, data) => {
		if (error) {
			console.log(`Error reading ${file}: ${error}`);
			process.kill(1);
		}
		console.log(data);
	});
}

// const args = process.argv.slice(2);
// for (let file of args) cat(file);

module.exports = { cat };
