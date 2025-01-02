-- PostgreSQL SQL Dump

-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2024 at 04:06 PM

BEGIN TRANSACTION;
SET TIME ZONE 'UTC';

-- DROP DATABASE IF EXISTS "WMC-Tracker";
-- CREATE DATABASE "WMC-Tracker" WITH ENCODING 'UTF8' LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8';
\c "WMC-Tracker";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS "location";
DROP TABLE IF EXISTS "user";

CREATE TABLE "user"
(
    "id"          SERIAL PRIMARY KEY,
    "uuid"        UUID UNIQUE          DEFAULT NULL,
    "username"    VARCHAR(20) NOT NULL UNIQUE,
    "password"    CHAR(60)    NOT NULL,
    "email"       VARCHAR(60) NOT NULL,
    "is_admin"    BOOLEAN     NOT NULL DEFAULT FALSE,
    "firstname"   VARCHAR(20)          DEFAULT NULL,
    "lastname"    VARCHAR(20)          DEFAULT NULL,
    "sex"         VARCHAR(12) NOT NULL DEFAULT '',
    "street"      VARCHAR(100)         DEFAULT NULL,
    "postal_code" VARCHAR(10)          DEFAULT NULL,
    "city"        VARCHAR(20)          DEFAULT NULL,
    "country"     VARCHAR(20)          DEFAULT NULL
);

CREATE TABLE "location"
(
    "id"        SERIAL PRIMARY KEY,
    "uuid"      UUID      DEFAULT NULL,
    "user_uuid" UUID           NOT NULL,
    "latitude"  DECIMAL(10, 8) NOT NULL,
    "longitude" DECIMAL(11, 8) NOT NULL,
    "time"      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "location" ADD CONSTRAINT fk_location_user FOREIGN KEY (user_uuid) REFERENCES "user" (uuid);

COMMIT;