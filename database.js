const excute = require('child_process').execFile;

excute('./database.sh', ['wesine027'], (err, stdout, stdin) => {
    if (err) {
        throw err;
    }

    
})