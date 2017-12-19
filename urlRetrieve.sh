#!/bin/bash

baseDir=${1}/app
userUrl=${baseDir}/router/${2}

echo ${baseDir}
echo ${userUrl}

if [ -d ${userUrl} ]
then
    rm -rf ${userUrl}
fi


sed -i "/${2}/ d" ${baseDir}/router.js 
