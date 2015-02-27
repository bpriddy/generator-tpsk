module.exports = Backbone.ModelBase.extend({
		//detecting location of user 
		type: 'geolocation',
		init: function(){
			
		},
		run: function(){
			this.trigger('complete', {
				name:'region',
				result:{
					location:"location" //TODO region test
				}
			})
			return
			if(this.type=='geolocation') {
				this.getGEOLocation(this.sendResult.bind(this))
			} else {
				this.getIP(this.sendResult.bind(this))
			}	

		},
		getGEOLocation: function(cb) {
			window.navigator.geolocation.getCurrentPosition(function(position){
				//only gives lat lng
				var location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
				//console.log('LOCATION', location)
				cb(location);
			});
			
		},
		getIP: function(cb) {
			this.url = "http://freegeoip.net/json/" 
			this.fetch({
                success: function(_this, obj, err) {
					cb(obj);
                },
                error: function(_this, obj) {
                    cb(obj);
                }
            });
		},
		sendResult: function(location) {
			this.trigger('complete', {
				name:'region',
				result:{
					location:location //TODO region test
				}
			})
		}
		
});