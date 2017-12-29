#!/bin/bash

psql -U ${1} -d ${2} -h ${3} -p ${4} --command "
drop table users_${5};
drop table userswm_${5};
drop table authorities_${5};
drop table counterUser_${5};
drop table counters_${5};
drop table shopUser_${5};
drop table shops_${5};
drop table areas_${5};
drop table bills_${5};
drop table cashiers_${5};
drop table customers_${5};
drop table products_${5};
drop table eventsList_${5};
drop table editResultList_${5};
drop table cashierSalesInfo_${5};
drop table customerSalesInfo_${5};
drop table productSalesInfo_${5};
drop table eventTAT_${5};
"
