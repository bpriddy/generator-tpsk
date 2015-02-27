//check user bandwidth
module.exports = Backbone.ModelBase.extend({
		init: function(){			
			
		},

		run: function(){
			var _this = this;
			//console.log("running bandwidth check");
			var speed = "10Mbps";
			this.trigger('complete', {
				name:'bandwidth',
				result:{
					speed: speed //TODO bandwidth test
					//http://stackoverflow.com/questions/4583395/calculate-speed-using-javascript
					//http://joshua.doodnauth.com/2013/01/experiment-javascript-connection-speed-test/
				}
			})

			return;
			
			var imageAddr = "http://bigtreestrategies.com/wp-content/uploads/2011/07/BigTree.jpg" + "?n=" + Math.random();
			var startTime, endTime;
			var downloadSize = 288000;
			var download = new Image();
			download.onload = function () {
			    endTime = (new Date()).getTime();
			    showResults();
			}
			startTime = (new Date()).getTime();
			download.src = imageAddr;

			function showResults() {
			    var duration = (endTime - startTime) / 1000;
			    var bitsLoaded = downloadSize * 8;
			    var speedBps = bitsLoaded / duration;
			    var speedKbps = (speedBps / 1024).toFixed(2);
			    var speedMbps = (speedKbps / 1024).toFixed(2);
			    console.log("Your connection speed is: \n" + 
			           speedBps + " bps\n"   + 
			           speedKbps + " kbps\n" + 
			           speedMbps + " Mbps\n" );
			    _this.trigger('complete', {
				name:'bandwidth',
				result:{
					speed: speedKbps //TODO bandwidth test
					//http://stackoverflow.com/questions/4583395/calculate-speed-using-javascript
					//http://joshua.doodnauth.com/2013/01/experiment-javascript-connection-speed-test/
				}
			})	
			}


				
		}

});