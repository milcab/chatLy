CREATE TABLE IF NOT EXISTS USERS (
	id INT PRIMARY KEY,
	userName VARCHAR(230),
	email VARCHAR(230),
	avatar bytea
);

CREATE TABLE IF NOT EXISTS CHATROOM (
	id INT PRIMARY KEY,
	name VARCHAR(230),
	createdBy int,
	FOREIGN KEY(createdBy) 
	REFERENCES USERS(id)
);

CREATE TYPE valid_status AS ENUM ('read', 'delivered');

CREATE TABLE IF NOT EXISTS MESSAGES (
	id INT PRIMARY KEY,
	userId INT,
	chatroomId INT,
	status valid_status,
	text VARCHAR(230),
	FOREIGN KEY(chatroomId) 
	REFERENCES CHATROOM(id),
	FOREIGN KEY(userId) 
	REFERENCES USERS(id)
);

CREATE TABLE IF NOT EXISTS CHATROOM_USERS (
	id INT PRIMARY KEY,
	userId int,
	chatroomId int,
	isAdmin boolean,
	FOREIGN KEY(chatroomId) 
	REFERENCES CHATROOM(id),
	FOREIGN KEY(userId) 
	REFERENCES USERS(id)
);

CREATE TYPE valid_media_type AS ENUM ('video', 'image', 'audio');
CREATE TABLE IF NOT EXISTS MEDIA (
	id INT PRIMARY KEY,
	userId int,
	chatroomId int,
	mediaType valid_media_type,
	FOREIGN KEY(chatroomId) 
	REFERENCES CHATROOM(id),
	FOREIGN KEY(userId) 
	REFERENCES USERS(id)
);



