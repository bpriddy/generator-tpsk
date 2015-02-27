var Device = 			require("./device.js");
var Browser = 			require("./browser.js");
//var Region =			require("./region.js");
//var Language = 			require("./language.js");
//var Bandwidth = 		require("./bandwidth.js");
//var Webgl = 			require("./webgl.js");
 
module.exports = Backbone.ModelBase.extend({
		results: {},
		init: function(){	
			this.createObjects();
			this.bindEvents();
		},
		createObjects: function() {
			this.device = new Device();
			this.browser = new Browser();	
			//this.region = new Region();		
			//this.language = new Language();
			//this.bandwidth = new Bandwidth();
			//this.webGl = new Webgl();
		},
		bindEvents: function() {
			this.device.on('complete',this.handleComplete.bind(this));
			this.browser.on('complete',this.handleComplete.bind(this));
			//this.region.on('complete',this.handleComplete.bind(this));
			//this.language.on('complete',this.handleComplete.bind(this));
			//this.bandwidth.on('complete',this.handleComplete.bind(this));
			//this.webGl.on('complete',this.handleComplete.bind(this));
		},
		handleComplete: function(e) {
			this.results[e.name] = e.result;
			//console.log(e.result);
			if( 
				this.results.device && 
				this.results.browser //&& 
				//this.results.region && 
				//this.results.language && 
				//this.results.bandwidth &&				
				//this.results.webgl 
			) {

				this.complete()

			}
		},
		run: function(cb){
			this.cb = cb
			this.device.run();
			this.browser.run();
			//this.region.run();
			//this.language.run();
			//this.bandwidth.run();
			//this.webGl.run();
		},
		complete: function() {
			if(this.cb && typeof this.cb === 'function') {
				this.cb(this.results)
			} else {
				this.trigger('complete',this.results)
			}
		}
		
});