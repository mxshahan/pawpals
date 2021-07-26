const { animalsQ } = require('./queries.js');
const db = require('./postgresPool');

const addAnimal = (params) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAll, params, (error, res) => {
      if(error) reject(error.stack);
      resolve(res.rows);
    });
  });
};

const getAnimals = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAll, [], (error, res) => {
      if(error) reject(error.stack);
      resolve(res.rows);
    });
  });
};

// TO BE DELETED LATER
const t = ["t.id=1", "t.name=so", "t.dd=4"];
console.log(t.toString().split(",").join(" AND "));

const getAnimalsWiFavs = ({ userID, atype, gender, breed }) => {
  return new Promise((resolve, reject) => {
      let query = animalsQ.getAllWiFav;
      let where = "";
      let and = [];

      if (atype) {
          and.push(`t.id=${atype}`);
      }
      if (gender) {
          and.push(`an.gender=${gender}`);
      }
      if (breed) {
          and.push(`an.breedID=${breed}`);
      }
      if (and.length > 0) {
          where = `WHERE ${and.join(" AND ")}`;
      }

      query += " " + where

      db.query(query, [userID], (error, res) => {
          if (error) reject(error.stack);
          // resolve(res.rows);
          if (res != undefined) {
              resolve(res.rows);
          } else {
              reject("no data");
          }
      });
  });
};

const getAnimalsWiAllFilter = (id) => {
  return new Promise((resolve, reject) => {
      db.query(animalsQ.getAllWiFav, id, (error, res) => {
          if (error) reject(error.stack);
          // resolve(res.rows);
          if (res != undefined) {
              resolve(res.rows);
          } else {
              reject("no data");
          }
      });
  });
};


const getAvailabilities = () => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getAvailabilities, [], (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) {
        resolve(res.rows);
      }
      else {
        reject('no data');
      };
    });
  }) ; 
};

const getBreeds = (atypeid) => {
  return new Promise((resolve, reject) => {
    db.query(animalsQ.getBreeds, atypeid, (error, res) => {
      if(error) reject(error.stack);
      if(res != undefined) {
        resolve(res.rows);
      }
      else {
        reject('no data')
      };
    });
  });  
};

module.exports = {
  addAnimal,
  getAnimals,
  getAnimalsWiFavs,
  getAvailabilities,
  getBreeds
};