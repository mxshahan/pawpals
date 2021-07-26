const router = require('express').Router();
const animalsController = require('../controllers/animalsController');
const animalsModel = require("../controllers/animalsController");

const checkAuthentication = require('../config/isAuthenticated');

// addAnimal: 'INSERT INTO animals (aName, gender, aDescription, breedID, aTypeID, availabilityID, updatedByID, dateAdded, dateUpdated, imageURL) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',

// to-do: test this from front end
router.post('/addAnimal/:name/:gender/:desc/:breedID/:typeID/:avID/:updateByID/:dateAdd/:dateUpdate/:imageURL', checkAuthentication, (req, results) => {
  // app.get('/getanimals', (req, results) => {
  var params = [
    req.params.name,
    req.params.desc,
    req.params.breedID,
    req.params.typeID,
    req.params.avID,
    req.params.updateByID,
    req.params.dateAdd,
    req.params.dateUpdate,
    req.params.imageURL
  ];
  animalsModel
    .addAnimal(params)
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
});

router.get("/getAnimals", (req, results) => {
  // app.get('/getanimals', (req, results) => {
  animalsModal
    .getAnimals()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get("/getAnimalsWiFavs", (req, results) => {
  const { userID, atype, gender, breed } = req.query;
  animalsModel.getAnimalsWiFavs({
    userID,
    atype,
    gender,
    breed,
  })
    .then(res => {
      console.log({ RES: res });            // TO BE DELETED
      results.status(200).send(res);
    })
    .catch(error => {
      console.log({ ERR: error });          // TO BE DELETED
      results.status(500).json(error);
    });
});

router.get("/getAvailabilities/", (req, results) => {
  animalsModel
    .getAvailabilities()
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
});

router.get("/getBreeds/:atype", (req, results) => {
  animalsModel
    .getBreeds([req.params.atype])
    .then(res => {
      results.status(200).send(res);
    })
    .catch(error => {
      results.status(500).json(error);
    });
});


module.exports = router;