
DROP TABLE user_authentication;

ALTER TABLE user ADD COLUMN `key` CHAR(36) NOT NULL;
