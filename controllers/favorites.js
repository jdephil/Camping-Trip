// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')

router.get('/', function(req, res) {
    db.favorite.findAll().then((starsAll) => {
      res.render('favorites/index', {
        images: starsAll
      });
    }) 
    
  });

// POST /favorites - receive the info and add it to the database
router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    db.favorite.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    })
    .then((favorites) => {
      res.redirect('/results')
    }).catch(error => {
      console.log(error)
    })
    
  });
  


// export router
module.exports = router;