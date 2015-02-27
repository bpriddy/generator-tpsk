module.exports = Backbone.ModelBase.extend({
		//detecting preferred served language
		init: function(){
			
		},
		
		run: function(){
			var language;
			if(window.navigator.languages) {
                language = window.navigator.languages[0]
            } else {
                language = (window.navigator.userLanguage || window.navigator.language).split('-')[1].toUpperCase();
            }
		    this.trigger('complete', {
				name:'language',
				result:{
					language:language
				}
			})
		}
		
});