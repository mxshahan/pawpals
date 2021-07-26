-- static data; inserted once; never modified (at least it's not available on the app at this time)
INSERT INTO types (aType) values
('Dog'), ('Cat'), ('Other');

-- type 1=dog, 2=cat, 3=other
Insert into breeds (breed, aTypeID) values 
('Labrador', 1),
('German Shepherd', 1),
('Australian Shepherd', 1),
('Golden Retriever', 1),
('Poodle', 1),
('Pitbull', 1),
('French Bulldog', 1),
('Pug', 1),
('Mixed', 1),
('Silver Tabby', 2),
('Tortoiseshell', 2),
('Calico', 2),
('Maine Coon', 2),
('Angora', 2),
('Turkish Van', 2),
('Siamese', 2),
('Mixed', 2);

INSERT INTO availabilities(availability) VALUES
('Available'), ('Pending'), ('Not available'), ('Adopted');

INSERT INTO dispositions(disposition) VALUES
('Good with other animals'), ('Good with children'), ('Animal must be leashed at all times');

INSERT INTO userRoles(userRole) VALUES
('User'), ('Admin');

INSERT INTO newsItemTypes(newsItemType) VALUES
('Animal Joined'), ('Event'), ('News');

