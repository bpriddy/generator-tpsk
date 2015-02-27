var express    = require('express');
var path       = require('path');

/*************************************************
 PROCESS STYLES
 *************************************************/

 module.exports = function(gulp,pubsub) {
	this.init = function(domain) { }
 	this.run = function(domain, languages) {
 		var server = express();
		var options = {
			dotfiles: 'ignore',
			setHeaders: function(res, path, stat) {
				res.set('x-timestamp', Date.now());
			}
		};
		server.use(require('connect-livereload')());
		var p = path.resolve("./dist/"+domain.title+"/");
		return server
			.use("/", express.static(p, options))
			.listen(domain.port, "0.0.0.0");
 	}
    this.watch = function(domain_title) { }
 }