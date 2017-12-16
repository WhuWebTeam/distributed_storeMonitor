#!/bin/bash

if [ -e ~/.pgpass ]
then
    echo ~/.pgpass file exists
else
    echo ${1} >> ~/.pgpass
fi
