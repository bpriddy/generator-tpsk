var express    = require('express');
var gutil      = require('gulp-util');

/*************************************************
 PROCESS STYLES
 *************************************************/

 module.exports = function(gulp,pubsub) {
	this.init = function(domain) { }
 	this.run = function(domain, languages) {
		var cb = cb || gutil.noop;
		var role = "api";
		var apiApp = express();
		var apiServer = require('http').createServer(apiApp);
		var appPath = "../dist/" + domain.title + "/scripts/index.js";
		var Module = require('module');
		gutil.log("Starting API Server");
		delete require.cache[Module._resolveFilename(appPath, module)];
		require(appPath)(apiApp, apiServer);
		return apiServer.listen(domain.port, "0.0.0.0", cb);
 	}
 	this.watch = function(domain_title) { }
 }