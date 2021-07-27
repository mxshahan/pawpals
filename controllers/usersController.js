const { usersQ } = require('./queries.js');
const  db = require('./postgresPool');

const addFav = (ids) => {
  // console.log("in addfavs, id: ",ids);
  return new Promise((resolve, reject) => {
    db.query(usersQ.addFav, ids, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addUser = (params) => {
  // console.log("in addUsers, id: ",params);
  return new Promise((resolve, reject) => {
    db.query(usersQ.addUser, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const deleteFav = (ids) => {
  // console.log("in deletefavs, id: ",ids);
  return new Promise((resolve, reject) => {
    db.query(usersQ.deleteFav, ids, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const deleteUser = (params) => {
  // console.log("in deleteUsers, id: ",params);
  return new Promise((resolve, reject) => {
    db.query(usersQ.deleteUser, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getAllUsernames = () => {
  // console.log("in getAllUsernames");
  // console.log(usersQ.getAllUserNames);
  return new Promise((resolve, reject) => {
    db.query(usersQ.getAllUserNames, [], (error, res) => {
      if(error) {
        reject(error.stack);
      }
      // console.log("res: ",res);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getFavs = (id) => {
  // console.log("in getfavs, id: ",id);
  return new Promise((resolve, reject) => {
    db.query(usersQ.getFavs, id, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      // console.log(res);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const updateUserEmail = (params) => {
  // console.log("in updateUserEmail, params: ",params);
  return new Promise((resolve, reject) => {
    db.query(usersQ.updateUserEmail, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      // console.log(res);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const updateUserPass = (params) => {
  // console.log("in updateUserPass, params: ",params);
  return new Promise((resolve, reject) => {
    db.query(usersQ.updateUserPass, params, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      // console.log(res);
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

module.exports = {
  addFav,
  addUser,
  deleteFav,
  deleteUser,
  getAllUsernames,
  getFavs,
  updateUserEmail,
  updateUserPass
};