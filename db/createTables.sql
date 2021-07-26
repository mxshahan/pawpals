DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS breeds CASCADE;
DROP TABLE IF EXISTS availabilities CASCADE;
DROP TABLE IF EXISTS dispositions CASCADE;
DROP TABLE IF EXISTS userRoles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS newsItemTypes CASCADE;
DROP TABLE IF EXISTS newsItems CASCADE;
DROP TABLE IF EXISTS animals CASCADE;
DROP TABLE IF EXISTS animalDispositions CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

-- MUST be created in this order
CREATE TABLE IF NOT EXISTS types(
  id INT GENERATED ALWAYS AS IDENTITY,
  aType varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS breeds(
  id INT GENERATED ALWAYS AS IDENTITY,
  breed varchar(256) not null,
  aTypeID INT not null,
  primary key (id),
  CONSTRAINT aTypeFK FOREIGN KEY(aTypeID) REFERENCES types(id)
);

CREATE TABLE IF NOT EXISTS availabilities(
  id INT GENERATED ALWAYS AS IDENTITY,
  availability varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS dispositions(
  id INT GENERATED ALWAYS AS IDENTITY,
  disposition varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS userRoles(
  id INT GENERATED ALWAYS AS IDENTITY,
  userRole varchar(256) not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS users(
  id INT GENERATED ALWAYS AS IDENTITY,
  userRoleID INT not null,
  userName VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  primary key (id),
  CONSTRAINT userRoleFK FOREIGN KEY(userRoleID) REFERENCES userRoles(id),
  UNIQUE(userName),
);

CREATE TABLE IF NOT EXISTS newsItemTypes(
  id INT GENERATED ALWAYS AS IDENTITY,
  newsItemType varchar(256) not null,
  primary key (id)
);

-- order of operations:
-- user chooses type
-- db request to get all breeds from that type
-- user chooses breed from that list
CREATE TABLE IF NOT EXISTS animals(
  id INT GENERATED ALWAYS AS IDENTITY,
  aName VARCHAR(256),
  gender INT NOT NULL,
  aDescription VARCHAR,
  breedID INT not null,
  aTypeID INT not null,
  availabilityID INT not null,
  updatedByID INT not null,
  dateAdded TIMESTAMP not null,
  dateAdopted TIMESTAMP,
  dateUpdated TIMESTAMP NOT NULL,
  imageURL VARCHAR,
  primary key (id),
  CONSTRAINT breedFK FOREIGN KEY(breedID) REFERENCES breeds(id),
  CONSTRAINT aTypeFK FOREIGN KEY(aTypeID) REFERENCES types(id),
  CONSTRAINT availabilityFK FOREIGN KEY(availabilityID) REFERENCES availabilities(id),
  CONSTRAINT updatedByFK FOREIGN KEY(updatedByID) REFERENCES users(id)
);

-- possible combos:
-- AnimalJoined: insert animalID
-- Event: insert timestamp, description
-- News: insert description
CREATE TABLE IF NOT EXISTS newsItems(
  id INT GENERATED ALWAYS AS IDENTITY,
  newsItemTypeID INT not null,
  animalID INT,
  eventDate TIMESTAMP,
  aDescription VARCHAR,
  primary key (id),
  CONSTRAINT newsItemTypeFK FOREIGN KEY(newsItemTypeID) REFERENCES newsItemTypes(id),
  CONSTRAINT animalFK FOREIGN KEY(animalID) REFERENCES animals(id)
);

CREATE TABLE IF NOT EXISTS animalDispositions(
  id INT GENERATED ALWAYS AS IDENTITY,
  animalID INT not null,
  dispositionID INT not null,
  primary key (id),
  CONSTRAINT animalFK FOREIGN KEY(animalID) REFERENCES animals(id),
  CONSTRAINT dispositionFK FOREIGN KEY(dispositionID) REFERENCES dispositions(id) 
);

CREATE TABLE IF NOT EXISTS favorites(
  id INT GENERATED ALWAYS AS IDENTITY,
  animalID INT not null,
  userID INT not null,
  primary key (id),
  UNIQUE(animalID, userID),
  CONSTRAINT animalFK FOREIGN KEY(animalID) REFERENCES animals(id) ON DELETE CASCADE,
  CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES users(id) ON DELETE CASCADE 
);

