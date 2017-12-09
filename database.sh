#!/bin/bash


# Some path
app=./app/
router=${app}router/
dir=${router}${1}/


# Judge directory of tenant exists or not
if [ -d ${dir} ]
then
    echo "${dir} exists"
else
    rm -rf ${dir}
    mkdir ${dir}
fi


# Generate tenant's url files
cp -R ${router}/tenantTemplate/* ${dir}
sed -i "s/tenantTemplate/${1}/g" `grep "tenantTemplate" -rl --include="*.js" ${dir}`

echo ----------------
# register tenant's url in application's url
for url in `grep ${1} -rl --include="*.js" ${dir}`; do
    url=${url#*app}
    url=${url%.js}
    str="require(.${url})(app)";
    echo ${app}router.js
    sed -i "/}/i\\    ${str}"  ${app}router.js
done
