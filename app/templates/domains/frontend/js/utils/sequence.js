module.exports = function Sequence(sequenceArray, options) {
	var varArray = {};
	if(options && options.args) {
		varArray = options.args
	}
	
	var applyArgs = function(args) {
		if(args) {
			for(var i=0;i<args.length;i++) {
				varArray[sequenceArray[0].o[i]] = args[i];
			}
		}
	}
	var prepArgs = function(args) {
		var prepped = []
		if(args) {
			//console.log(varArray[args[0]])
			for(var i=0; i<args.length;i++) {
				if(varArray[args[i]]) {
					prepped.push(varArray[args[i]]);
				} else {
					prepped.push(null);
				}
			}
		}
		return prepped
	}

	var callback = function() {
		applyArgs(arguments)
		sequenceArray.shift()
		//console.log(sequenceArray.length);
		if(sequenceArray.length) {
			run()
		} else {
			//console.log("varArray", varArray);
			options.completed(varArray)
		}
	}

	var run = function() {
		var args = prepArgs(sequenceArray[0].i)
		args.push(callback)
		sequenceArray[0].fn.apply(this,args)
	}

	run();
	
}