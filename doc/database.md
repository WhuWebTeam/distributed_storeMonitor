1. wesineSystem

    ```postgre

    CREATE TABLE public.wesineSystem
    (
        id varchar(50) primary key,
        password varchar(50) not null,
        name varchar(50),
        icon varchar(200),
        logo varchar(50),
        token varchar(200)
    ) 
    WITH (
    OIDS = FALSE
    );
    ALTER TABLE public.wesineSystem
    OWNER TO wesine_lpssystem;
    
    ```