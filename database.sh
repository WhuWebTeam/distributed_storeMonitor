#!/bin/bash

baseDir=./app/router/

dir=${baseDir}${1}


if [ -d ${dir} ]
then
    echo "${dir} exists"
else
    rm -rf ${dir}
    mkdir ${dir}
    echo "${dir} created successed"
fi

cp -R ${baseDir}/tenantTemplate/* ${dir}

sed -i "s/tenantTemplate/${1}/g" `grep tenantTemplate -rl --include="*.js" ${dir}`