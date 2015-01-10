var _glob = require("glob");
var fs = require("fs-promise");
var path = require("path");
var par = require("par");
var Promise = require("any-promise");
var dotty = require("dotty");
var cypher = require("cypher-promise");

module.exports = build_api;

function build_api(directory, cypher_connection) {
	var cypher_client = cypher(cypher_connection);
	return load_all_queries(cypher_client, directory);
}

function load_all_queries(cypher, directory) {
	return get_cypher_file_names(directory).then(par(process_cypher_files, cypher, directory));
}

function get_cypher_file_names(directory) {
	return glob(path.join(directory, "**/*.cql"));
}

function process_cypher_files(cypher, directory, files) {
	var map = {};
	return Promise.all(files.map(par(load_query_file, directory, cypher, map)))
		.then(function() {
			return map;
		});
}

function load_query_file(directory, cypher, map, file) {
	var name = get_query_name(directory, file);
	return fs.readFile(file).then(par(save_query, cypher, map, name));
}

function save_query(cypher, map, name, contents) {
	dotty.put(map, name, make_query(contents));
	return map;
}

function make_query(cypher, query_string) {
	return function(params) {
		return cypher.query(query_string, paramss);
	}
}

function get_query_name(directory, file_path) {
	return path.relative(directory, file_path).replace(/\.cql$/i, "").split(path.sep);
}

function glob(pattern) {
	return new Promise(function(resolve, reject) {
		_glob(pattern, function(err, matches) {
			if (err) reject(err);
			else resolve(matches);
		});
	});
}
