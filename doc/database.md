1. wesineSystem

    ```postgre

    CREATE TABLE public.wesineSystem
    (
        id varchar(50) primary key,
        name varchar(50),
        icon varchar(200),
        logo varchar(50)
    ) 
    WITH (
    OIDS = FALSE
    );
    ALTER TABLE public.wesineSystem
    OWNER TO wesine_lpssystem;
    
    ```