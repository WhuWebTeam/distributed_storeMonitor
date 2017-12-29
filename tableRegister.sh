#!/bin/bash

psql -U ${1} -d ${2} -h ${3} -p ${4} --command "CREATE TABLE public.users_${5}
(
    id varchar(50) primary key,
    username varchar(50),
    password varchar(50) not null,
    phone varchar(11),
    email varchar(50),
    authorityId varchar(50)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE public.users_${5}
OWNER TO wesine_lpssystem;


CREATE TABLE public.userswm_${5}
(
    wmUserId varchar(50) primary key,
    wmUserLvl int,
    userName varchar(50),
    phone varchar(11),
    email varchar(50),
    authorityId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.userswm_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.authorities_${5}
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
)
WITH (
    OIDS = FALSE
);
ALTER TABLE public.authorities_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.counterUser_${5}
(
    id serial primary key,
    userId varchar(50),
    counterId varchar(50),
    type varchar(50) default 'pos'
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counterUser_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.counters_${5}
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
ALTER TABLE public.counters_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.shopUser_${5}
(
    id serial primary key,
    userId varchar(50),
    shopId varchar(50),
    type varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.shopUser_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.shops_${5}
(
    id varchar(50) primary key,
    areaId varchar(50),
    name varchar(50),
    details varchar(500)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.shops_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.areas_${5}
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.areas_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.bills_${5}
(
    id serial,
    syskey varchar(50) primary key,
    price int,
    quantity int,
    amount int,
    ts bigint,
    scriptVer varchar(50),
    eventFlag varchar(50),
    cashierId varchar(50),
    customerId varchar(50),
    transId varchar(50),
    shopId varchar(50),
    counterId varchar(50),
    productId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.bills_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.cashiers_${5}
(
    id varchar(50) primary key,
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.cashiers_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.customers_${5}
(
    id varchar(50) primary key,
    name varchar(50),
    type varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.customers_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.products_${5}
(
    id varchar(50) primary key,
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.products_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.eventsList_${5}
(
    id serial,
    sysKey varchar(50) primary key,
    transId varchar(50),
    ts bigint,
    createAt bigint,
    editResult varchar(50),
    status int default 0,
    comments varchar(500),
    videoStartTime bigint,
    videoEndTime bigint,
    videoUrl varchar(200),
    pic1Url varchar(200),
    pic2Url varchar(200),
    pic3Url varchar(200),
    pic4Url varchar(200),
    productId varchar(50),
    productName varchar(50),
    counterId varchar(50),
    counterType varchar(50),
    cashierId varchar(50),
    cashierName varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventsList_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.editResultList_${5}
(
  id varchar(50) primary key,
  name varchar(50),
  details varchar(200)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.editResultList_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.eventTAT_${5}
(
  id serial primary key,
  sysKey varchar(50),
  shopId varchar(50),
  checkerId varchar(50),
  checkerName varchar(50),
  type int,
  createAt bigint,
  duration bigint
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventTAT_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.cashierSalesInfo_${5}
(
    id serial,
    ts bigint,
    duration bigint,
    rate real,
    amount bigint,
    cashierId varchar(50),
    transId varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.cashierSalesInfo_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.customerSalesInfo_${5}
(
    id serial,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    customerId varchar(50),
    transId varchar(50),
    productId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.customerSalesInfo_${5}
  OWNER TO wesine_lpssystem;


CREATE TABLE public.productSalesInfo_${5}
(
    id serial,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    shopId varchar(50),
    productId varchar(50),
    transId varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.productSalesInfo_${5}
  OWNER TO wesine_lpssystem;
"

