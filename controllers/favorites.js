// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')

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
        photo: req.body.photo,
        userId: req.body.userId
    })
    .then((favorites) => {
      
      req.flash('success', 'Favorited!')
      //res.redirect('/results')
    }).catch(error => {
      console.log(error)
    })
    
  });
  


// export router
module.exports = router;