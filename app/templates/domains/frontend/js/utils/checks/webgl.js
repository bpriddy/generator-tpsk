module.exports = Backbone.ViewBase.extend({

		init: function(){			
			
		},
		
		run: function(){
			//console.log("running webgl check!");
			var canvas = document.createElement('canvas');
			var enabled;
		    if ('supportsContext' in canvas) {
		      enabled = ("supportsContext", canvas.supportsContext('webgl') || canvas.supportsContext('experimental-webgl'));
		    } else {
		    	enabled = !!window.WebGLRenderingContext;
		    }
		    this.trigger('complete', {
				name:'webgl',
				result:{
					enabled:enabled
				}
			})
		}

});