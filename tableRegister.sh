#!/bin/bash

psql -U ${1} -d ${2} -h ${3} -p ${4} --command "CREATE TABLE public.${5}_counters
(
    id varchar(50) primary key,
    shopId varchar(50),
    typeId varchar(50),
    details varchar(500),
    assigned boolean default false,
    cameraIp varchar(50),
    alarmIp varchar(50),
    alarmPort varchar(50),
    posIp varchar(50),
    posCtlPort varchar(50),
    posBillPort varchar(50),
    posAlarmPort varchar(50),
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.${5}_counters
  OWNER TO wesine_lpssystem;



"
