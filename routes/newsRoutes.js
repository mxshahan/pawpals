const router = require('express').Router();
const checkAuthentication = require('../config/isAuthenticated');
const newsController = require('../controllers/newsController');

// to-do: test all post and deletes from front end
router.post('/addNewsAnimal/:itemTypeID/:animalID', checkAuthentication, (req, results) => {
  newsController.addNewsAnimal([req.params.itemTypeID, req.params.animalID])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addNewsEvent/:itemTypeID/:aDescription/:date', checkAuthentication, (req, results) => {
  newsController.addNewsEvent([req.params.itemTypeID, req.params.aDescription, req.params.date])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.post('/addNewsNews/:itemTypeID/:aDescription', checkAuthentication, (req, results) => {
  newsController.addNewsNews([req.params.itemTypeID, req.params.aDescription])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.delete('/deleteNews/:id', checkAuthentication, (req, results) => {
  newsController.deleteNews([req.params.id])
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});

router.get('/getNews', (req, results) => {
  newsController.getNews()
    .then(res => {
      results.status(200).send(res)
    })
    .catch(error => {
      results.status(500).json(error)
    });
});



module.exports = router;