const { newsQ } = require('./queries.js');
const  db = require('./postgresPool');

const addNewsAnimal = (vars) => {
  // console.log("in addnews anim, vars: ",vars);
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsAnimal, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addNewsEvent = (vars) => {
  // console.log("in addnews event, vars: ",vars);
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsEvent, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const addNewsNews = (vars) => {
  // console.log("in addnews news, vars: ",vars);
  return new Promise((resolve, reject) => {
    db.query(newsQ.addNewsNews, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const deleteNews = (vars) => {
  // console.log("in delteNews, vars: ",vars);
  return new Promise((resolve, reject) => {
    db.query(newsQ.deleteNews, vars, (error, res) => {
      if(error) {
        reject(error.stack);
      }
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

const getNews = () => {
  return new Promise((resolve, reject) => {
    db.query(newsQ.getNews, [], (error, res) => {
      if(error) {
        reject(error.stack);
      }
      // console.log(res.rows)
      if(res != undefined) resolve(res.rows);
      else reject('no data');
    })
  })
};

module.exports = {
  addNewsAnimal,
  addNewsEvent,
  addNewsNews,
  deleteNews,
  getNews
};