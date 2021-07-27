const { animalsQ } = require("./queries.js");
const db = require("./postgresPool");

const addAnimal = (params) => {
    return new Promise((resolve, reject) => {
        db.query(animalsQ.addAnimal, params, (error, res) => {
            if (error) reject(error.stack);
            if (res != undefined) resolve(res.rows);
            else reject("no data");
        });
    });
};

const addDisposition = (params) => {
    return new Promise((resolve, reject) => {
        db.query(animalsQ.addDisposition, params, (error, res) => {
            if (error) reject(error.stack);
            if (res != undefined) resolve(res.rows);
            else reject("no data");
        });
    });
};

const updateAvailability = (params) => {
    console.log("in updateUserEmail, params: ", params);
    return new Promise((resolve, reject) => {
        db.query(animalsQ.updateAvailability, params, (error, res) => {
            if (error) {
                reject(error.stack);
            }
            console.log(res);
            if (res != undefined) resolve(res.rows);
            else reject("no data");
        });
    });
};

const getAnimal = (params) => {
    // console.log(params);
    return new Promise((resolve, reject) => {
        db.query(animalsQ.getAnimal, params, (error, res) => {
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

        query += " " + where;

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
            if (error) reject(error.stack);
            if (res != undefined) {
                resolve(res.rows);
            } else {
                reject("no data");
            }
        });
    });
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
}

const getDispositions = () => {
    return new Promise((resolve, reject) => {
        db.query(animalsQ.getDispositions, [], (error, res) => {
            if (error) reject(error.stack);
            if (res != undefined) {
                resolve(res.rows);
            } else {
                reject("no data");
            }
        });
    });
};

const getTypes = () => {
    return new Promise((resolve, reject) => {
        db.query(animalsQ.getTypes, [], (error, res) => {
            if (error) reject(error.stack);
            if (res != undefined) {
                resolve(res.rows);
            } else {
                reject("no data");
            }
        });
    });
};

module.exports = {
    addAnimal,
    getAnimal,
    addDisposition,
    updateAvailability,
    getAnimalsWiFavs,
    getAvailabilities,
    getBreeds,
    getDispositions,
    getTypes,
    // getAnimals,
    getAnimalsWiAllFilter
};
