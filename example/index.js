var cypher_api = require("../");

console.log("Building API");
cypher_api(__dirname)
	.then(function(api) {
		console.log("Built API:", api);
	}, function(err) {
		console.log("Error:", err, err.stack);
	});
