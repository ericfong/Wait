var after = (function(){
	function fork(){
		// ID for each wrap
		var ID = 0;
		// waiting map for wrapped func
		var waiting = {};
		// seq for next func
		var seq = [];
		
		function after(func){
			var id = ID++;
			waiting[id] = true;
			// return the wrapped func
			return function(){
				var ret;
				// ignore the timeouted or returned funcs
				if (waiting[id]) {
					if (func)
						ret = func.apply(this, arguments);
					delete waiting[id];
				}
				if (seq.length > 0 && Object.keys(waiting).length == 0)
					next();					
				return ret;
			};
		}

		function next(err){
			// call next sequence function and pass down some error or result
			waiting = {};
			seq.shift().apply(this, arguments);
			if (seq.length > 0 && Object.keys(waiting).length == 0)
				next();		
		}

		function insert(err){
			// insert new functions into the sequence running head
			seq = Array.prototype.slice.call(arguments).concat(seq);
			if (seq.length > 0 && Object.keys(waiting).length == 0)
				next();		
		}

		function append(err){
			// queue new functions into the sequence running tail
			seq = seq.concat(Array.prototype.slice.call(arguments));
			if (seq.length > 0 && Object.keys(waiting).length == 0)
				next();		
		}
	
		after.next = next;
		after.insert = insert;
		after.append = append;
		after.fork = fork;
		return after;
	};
	return fork;
})();