const animalsQ = {
  addAnimal: 'INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID, availabilityID, updatedByID, dateAdded, dateUpdated, imageURL) VALUES ($1, $2, $3, $4, $5, $6, $7, Now(), Now(), $8) RETURNING id;',
  addDisposition: 'INSERT INTO animalDispositions (animalID, dispositionID) VALUES ($1, $2);',
  getAll : 'SELECT * FROM animals;',
  getAllWiFav: 'select fav.userid as favUserID, an.id as animalID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id as typeID, t.atype, av.id as availabilityID, av.availability from animals an inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id left join (select * from favorites f where f.userID=$1) fav on an.id = fav.animalID ',
  getAnimal: "select fav.userid as favUserID, an.id as animalID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id as typeID, t.atype, av.id as availabilityID, string_agg(d.disposition, ', ') as disposition, av.availability from animals an inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id left join (select * from favorites f where f.userID=$1) fav on an.id = fav.animalID left join (select * from animalDispositions ad where ad.animalID = $2) dis on an.id = dis.animalID left join dispositions d on dis.dispositionID = d.id where an.id = $2 group by an.id, favUserID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id, t.atype, av.id, av.availability;",
  getAvailabilities: 'SELECT * from availabilities;',
  getBreeds : 'SELECT * from breeds WHERE atypeid=$1;',
  getDispositions: 'SELECT * from dispositions;',
  getTypes: 'SELECT * from types;',
  updateAvailability: 'UPDATE animals SET availabilityID = $1 where id = $2;'
};

const authQ = {
  addUser: 'INSERT INTO users (userRoleID, userName, password, email) VALUES ($1, $2, $3, $4) RETURNING id;',
  login: 'SELECT * FROM users WHERE users.userName = $1;',
};

const newsQ = {
  addNewsAnimal : 'INSERT INTO newsItems(newsItemTypeID, animalID) VALUES ($1, $2);',
  addNewsEvent : 'INSERT INTO newsItems(newsItemTypeID, aDescription, eventDate) VALUES($1, $2, $3);',
  addNewsNews : 'INSERT INTO newsItems(newsItemTypeID, aDescription) VALUES ($1, $2);',
  deleteNews : 'DELETE FROM newsitems WHERE id = $1;',
  getNews : 'SELECT n.id as newsItemId, nt.newsItemType, n.eventDate, n.aDescription, n.animalID, an.aName, an.imageURL FROM newsitems n JOIN newsItemTypes nt on n.newsItemTypeId = nt.id LEFT JOIN animals an on n.animalID = an.id;'
};

const usersQ = {
  addFav : 'INSERT INTO favorites(animalID, userID) VALUES ($1, $2);',
  addUser: 'INSERT INTO users (userRoleID, userName, password, email) VALUES ($1, $2, $3, $4) RETURNING id;',
  deleteFav : 'DELETE FROM favorites WHERE animalID = $1 and userID = $2;',
  deleteUser: 'DELETE FROM users WHERE id = $1;',
  getAllUserNames: 'SELECT users.username FROM users;',
  getFavs : 'select an.id as animalID, f.userid as favUserID, an.aname, an.gender, an.adescription, an.imageURL, b.breed, t.id, t.atype, av.id, av.availability from favorites f inner join animals an on f.animalID = an.id inner join breeds b on an.breedID = b.id inner join types t on an.atypeID = t.id inner join availabilities av on an.availabilityID = av.id where userID = $1',
  getUser: '',
  updateUserEmail: 'UPDATE users SET email = $1 where id = $2;',
  updateUserPass: 'UPDATE users SET password = $1 where id = $2;'
};



module.exports = { 
  animalsQ, 
  authQ,
  newsQ, 
  usersQ 
};
