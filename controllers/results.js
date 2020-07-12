// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')


router.get('/results', (req, res) => {
  var nasaUrl = `https://images-api.nasa.gov/search?q=${req.query.search}&media_type=image`;
 axios.get(nasaUrl).then ( function(apiResponse) {
     var stars = apiResponse.data
     console.log(stars)
  res.render('results/index', { 
      stars: stars,
      user: req.user 
  });
  //res.send(stars)
 })
     

})

router.get('/results/:id', (req, res) => {
  var nasaUrl = `https://images-api.nasa.gov/search?q=${req.params.id}&media_type=image`;
  axios.get(nasaUrl).then( function(apiResponse) {
    var stars = apiResponse.data;
    res.render('results/show', { 
        stars: stars,
        user: req.user 
      });
    console.log(stars)
  })
})



module.exports = router;