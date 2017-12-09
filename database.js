const excute = require('child_process').execFile;

excute('./database.sh', ['tenantTemplate'], (err, stdout, stdin) => {
    if (err) {
        throw err;
    }

    
})