const fs = require("fs");

function readFile(file) {
	fs.readFile(file, "utf8", (error, data) => {
		if (error) {
			console.log(`Error reading ${file}:`);
			console.log(error);
			process.kill(1);
		}

		console.log(data);
	});
}

const args = process.argv.slice(2);
for (let file of args) readFile(file);
