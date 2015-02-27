module.exports = Backbone.ViewBase.extend({

		init: function(){			

		},
		run: function(){
		//	console.log("running device check");
			var mobileOS = null;
			var result;
			var ua = navigator.userAgent;
			if(ua.match(/Android/i)) {
				mobileOS = 'Android';
			} else if( ua.match(/BlackBerry/i)){
		    	mobileOS = 'BlackBerry';
		    } else if( ua.match(/iPhone/i)) {
		    	mobileOS = 'iOS';
		    } else if( ua.match(/iPad/i)) {
		    	mobileOS = 'iOS';
		    } else if( ua.match(/iPod/i)) {
		    	mobileOS = 'iOS';
		    } else if (ua.match(/Opera Mini/i)){
	        	mobileOS = 'Opera';
	        } else if(ua.match(/IEMobile/i)){
	        	mobileOS = 'Windows';
		    }
		    if(mobileOS) {
		    	result = {
		    		type: 'mobile',
		    		os: mobileOS
		    		//version: needs to be added		    		
		    	}
		    }else {
		    	result = {
		    		type: 'desktop',
		    		os: this.os()
		    	}

		    }
		  	// result = {
	    // 		type: 'mobile' //test mobile on desktop
	    // 	} 
		    this.trigger('complete', {
				name:'device',
				result: result
			})
		},
		os: function() {
			var OSName;
			if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
			if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
			if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
			if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
			return OSName;
		}

});