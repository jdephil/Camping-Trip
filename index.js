// --- Required NPM libraries
// configure dotenv
require('dotenv').config()
// require express & set up express app instance
const Express = require('express')
// require and set view engine use ejs
const ejsLayouts = require('express-ejs-layouts')
// require all middleware for app/authentication
// helmet, morgan, passport, and custom middleware,
// express-sessions, sequelize sessions, flash
const helmet = require('helmet')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/ppConfig')
const db = require('./models')
// want add link to our custom middleware for isLoggedIn
const isLoggedIn = require('./middleware/isLoggedIn')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const axios = require('axios'); 
const methodOverride = require('method-override')
// var campingDb = new pg.camping-trip(conString);


// --- App Setup
const app = Express()
// set app to use false urlencoding 
app.use(Express.urlencoded({ extended: false }))
// set app public directory for use
app.use(Express.static(__dirname + '/public'))
// set app ejsLayouts for render
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())
app.use(methodOverride('_method'))


// create new isntance of class Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync()

// initialize and link flash message and passport and session
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req, res, next) {
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user

    next()
})



app.get('/results', (req, res) => {
  var nasaUrl = `https://images-api.nasa.gov/search?q=${req.query.search}&media_type=image`;
 axios.get(nasaUrl).then ( function(apiResponse) {
     var stars = apiResponse.data
  res.render('results/index', { 
      stars: stars,
      user: req.user 
  });
 })
     

})

app.get('/results/:id', (req, res) => {
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

// --- Routes

app.get('/', (req, res) => {
    // check to see if user logged in
    res.render('index')

})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile')
})

// include auth controller
app.use('/auth', require('./controllers/auth'))

app.use('/favorites', require('./controllers/favorites'))

app.use('/trips', require('./controllers/trips'))



// initialize App on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`🍃vibing with ${process.env.PORT}`)
})
