// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')

router.get('/', function(req, res) {
    db.trip.findAll().then((trips) => {
      res.render('trips/index', {
        trips: trips
      });
    }) 
    
  });

// POST /trips - receive the info and add it to the database
router.post('/', function(req, res) {
    // TODO: Get form data and add a new record to DB
    db.trips.create({
        name: req.body.name,
        location: req.body.location
    })
    .then((trips) => {
      res.redirect('/')
    }).catch(error => {
      console.log(error)
    })
    
  });
  


// export router
module.exports = router;