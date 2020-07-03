// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')
// import middleware
const flash = require('connect-flash')
const passport = require('../config/ppConfig')

// register get router
router.get('/register', function (req, res) {
    res.render('auth/register')
})
// register post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if (created) {
            // authenticate user and start authorization process
            console.log('user created 👑')
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Thanks for signing up!'
            })(req, res)
        } else {
            // if user already exists
            console.log('user email already exists 🙈')
            // send error to user that email already exists
            req.flash('error', 'Error: email already exists for user. Try again.')
            // redirect back to register get route
            res.redirect('auth/register')
        }
    }).catch(function(err) {
        console.log(`error found. \nmessage: ${err.message}. \nplease review- ${err}`)
        req.flash('error', err.message)
        res.redirect('/auth/register')
    })
})

//login get route
router.get('/login', function(req, res) {
    res.render('auth/login')
})

// login post route

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        // if no user authenticated
        if (!user) {
            req.flash('error', 'invalid username or password')
                // redirect our user to try logging in again
                return res.redirect('/auth/login')
            
            
        }
        if (error) {
            return next(error)
        }
        req.login(user, function(error) {
            // if error move to error
            if (error) next(error)
            // if success flash success message
            req.flash('success', 'you are validated and logged in')
            // if sucess save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile')
            })
        })
    })(req, res, next)
})

// router.post('login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/auth/login',
//     successFlash: 'welcome to our app',
//     failureFlash: 'invalid username or password'
// }))

router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

// export router
module.exports = router;