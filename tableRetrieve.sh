#!/bin/bash

psql -U ${1} -d ${2} -h ${3} -p ${4} --command "

drop table ${5}_counters;
drop table ${5}_eventsList;

"
