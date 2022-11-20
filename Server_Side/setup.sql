-- Creating the DATABASE
CREATE DATABASE pollbooth;

USE pollbooth;

-- Creating the TABLES
-- users
CREATE TABLE users (
  username text,
  password text
);

-- pollList
CREATE TABLE pollList (
  pollname text,
  question text,
  option0 text,
  option1 text,
  option2 text,
  option3 text,
  option4 text,
  option5 text,
  option6 text,
  option7 text,
  option8 text,
  option9 text,
  teamid text,
  pollteamid text
);

-- poll
CREATE TABLE poll (
  username text,
  password text,
  teamid text,
  pollname text,
  selectedoption text,
  userpollid text
);

-- teamList
CREATE TABLE teamList (
  username text,
  password text,
  teamname text,
  teamdes text,
  teamid text,
  admin text,
  userteamid text
);
