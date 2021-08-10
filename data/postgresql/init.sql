CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS table_user;
DROP TABLE IF EXISTS table_user_detail;

CREATE TABLE IF NOT EXISTS table_user (
    id UUID PRIMARY KEY,
    login_name VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS table_user_detail (
    "user_id" UUID,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email_address VARCHAR NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY ("user_id") 
	  REFERENCES table_user(id)
);

DO $$
DECLARE id UUID;
BEGIN
    id := uuid_generate_v4();
    
    INSERT INTO table_user VALUES(id, 'jvituni', 'temporal');
    INSERT INTO table_user_detail VALUES(id, 'Javi', 'Bodas', 'gonzalezbodasjavier@yahoo.es');

END $$;
