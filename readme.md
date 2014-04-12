Check out test.js

    var Wait = require('./Wait.js');
    
    //first parallel group
    var wait = new Wait();
    
    setTimeout(wait(function() {
    
        console.log('A');
    
        function loopAsyncCall(i, callback) {
            setTimeout(function() {
                console.log('Async Loop ' + i);
                callback();
            }, 100);
        }
    
        for (var i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                loopAsyncCall(i, wait());
            }
        }
    
        // another async call
        setTimeout(wait(function() {
            console.log('Another Async call');
        }), 100);
    
        console.log('B');
    
        // firstCall
        wait.firstCall(function() {
            console.log('After All Async Calls');
        });
    
    }), 100);
    
    wait.then(function() {
        console.log('Finally .then() accept array of functions');
    }, function() {
        console.log('All Done');
    });


Will output:
    
    A
    B
    Async Loop 0
    Async Loop 2
    Async Loop 4
    Async Loop 6
    Async Loop 8
    Another Async call
    After All Async Calls
    Finally .then() accept array of functions
    All Done
    