// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')
const flash = require('connect-flash')
const passport = require('../config/ppConfig')

router.get('/', function(req, res) {
    db.favorite.findAll({
      where: {
        userId: req.user.id
      }
    }).then((starsAll) => {
      res.render('favorites/index', {
        myFavorites: starsAll
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
      userId: req.user.id
    })
    .then((favorites) => {
      
      req.flash('success', 'Favorited!')
      //res.redirect('/results')
    }).catch(error => {
      console.log(error)
    })
    
  });
  


router.delete('/:idx', (req, res) => {
  db.favorite.destroy({
    where: {
      id: req.params.idx
    }
  }).then (function() {
    res.redirect('/favorites')
  }).catch(function (error) {
    console.log(error)
  })
  
})  

router.get('/edit/:idx', (req, res) => {
  db.favorite.findOne({
    where: {
      id: req.params.idx
    }
  }).then (function(favorite) {
    res.render('favorites/edit', {favorite})
  }).catch(function (error) {
    console.log(error)
  })
 
})

router.put('/:idx', (req, res) => {
  db.favorite.update({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo
  }, {
    where: {
      id: req.params.idx
    }
  }).then (function(favorite) {
    res.redirect('/favorites')
  }).catch(function (error) {
    console.log(error)
  })
  
})
// export router
module.exports = router;