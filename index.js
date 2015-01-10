var par = require("par");
var cypher = require("cypher-promise");
var globBuild = require("glob-build");

module.exports = build_api;

function build_api(directory, cypher_connection) {
	var cypher_client = cypher(cypher_connection);
	return globBuild(directory, "cql", par(make_query, cypher_client));
}

function make_query(cypher, query_string) {
	return function(params) {
		return cypher.query(query_string, paramss);
	}
}
