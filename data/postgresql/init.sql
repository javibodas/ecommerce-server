CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS table_user;
DROP TABLE IF EXISTS table_user_detail;
DROP TABLE IF EXISTS table_country;
DROP TABLE IF EXISTS table_product;


CREATE TABLE IF NOT EXISTS table_user (
    id UUID PRIMARY KEY,
    login_name VARCHAR NOT NULL,
    email_address VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    create_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS table_user_detail (
	user_id UUID,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
	    REFERENCES table_user(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS table_country (
    name VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    currency VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS table_product (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR,
    image VARCHAR,
    price FLOAT(2)
);

DO $$
DECLARE id UUID;
BEGIN
    INSERT INTO table_country VALUES('Spain', 'ES', '€');
    INSERT INTO table_country VALUES('United Kingdom', 'UK', '£');
    INSERT INTO table_country VALUES('United States', 'US', '$');
END $$;
