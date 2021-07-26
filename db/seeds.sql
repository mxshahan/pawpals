-- these have been run 7/8

-- ('User'), ('Admin');
INSERT INTO users (userRoleID, userName, password, email) VALUES
(2, 'Kris', 'pass', 'kris@email.com'),
(2, 'Lexi', 'pass', 'lexi@email.com'),
(2, 'Liv', 'pass', 'liv@email.com');

-- non-static data that will start the db; can be deleted
-- gender male=1, female=2
-- aTypeID: dog=1, cat=2, other=3
-- be careful in seeds to choose type/breed that doesn't conflict bc there's no check to make sure they agree
INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID, availabilityID, updatedByID, dateAdded, dateUpdated, imageURL)
VALUES
('Jack', 1, 'Loveable four-year-old. Slightly skittish but cuddly and soft. Loves to play fetch with his mouse and have his belly rubbed. (Yes, he is a cat!)', 10, 2, 4, 1, current_timestamp, current_timestamp, 'https://www.pets4homes.co.uk/images/classifieds/2019/04/22/2272634/male-silver-tabby-wanted-5cbe0f46c565f.jpg'),
('Sammy', 2, 'Super chill and relaxed. Curious and friendly with visitors. Will sit and stare at you with intensity if you forget to feed her.', 11, 2, 4, 1, current_timestamp, current_timestamp, 'https://i1.wp.com/thecreativecat.net/wp-content/uploads/2013/07/Java-tortie.jpg?resize=800%2C1200'),
('Flower', 1, 'Cauliflower is her name, flower for short. She is older and wiser and loves to soak up the sun.', 17, 2, 1, 1, current_timestamp, current_timestamp, 'https://www.zastavki.com/pictures/originals/2013/Animals___Cats_Beautiful_white_cat_resting_on_the_grass_046960_.jpg'),
('Scooby Doo', 1, 'Super cute, smiley, and loves to cuddle and "catch" flowers.', 8, 1, 1, 1, current_timestamp, current_timestamp, 'https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2019/12/gold.jpg?resize=1250%2C702&ssl=1');

INSERT INTO animalDispositions(animalID, dispositionID)
VALUES
(2, 2);

-- ('Animal Joined', 'Event', 'News');
INSERT INTO newsItems(newsItemTypeID, aDescription, eventDate)
VALUES
(2, 'Grand opening!', current_timestamp);

INSERT INTO newsItems(newsItemTypeID, animalID)
VALUES
(1, 2);

INSERT INTO newsItems(newsItemTypeID, aDescription)
VALUES
(3, 'We have lots of super cute animals waiting for their forever home.');

INSERT INTO favorites(animalID, userID) VALUES (1, 1), (2, 1), (1,2);
