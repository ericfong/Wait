Use after like this:

	// first parallel group
    after = after.fork();
	after.append(function(){

		setTimeout(after(function(){
	  		out += '1<br/>';
	  		setTimeout(after(function(){
		  		out += '3<br/>';
			}), Math.random()*100);
	  		out += '2<br/>';
		 
			after.insert(function(){
		  		out += '4<br/>';
		  		after.next(null, 'result');
			});
		 
		}), Math.random()*100);

	});

	after.append(function(){
		console.log(arguments);
  		out += '5<br/>';
	}, function(err){
		console.log(arguments);
  		out += '6<br/>';
	});

	/*
	 Will print out 
	 1
	 2
	 3
	 4
	 5
	 6
	 */
	see index.html

		