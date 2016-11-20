const User = require('../models/User')
const passportConfig = require('../config/passport')

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.json({ title: 'Index' })
  })

  app.post('/login', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password cannot be blank').notEmpty()
    req.sanitize('email').normalizeEmail({ remove_dots: false })

    const errors = req.validationErrors()

    if (errors) {
      req.json({ errors: errors })
      return res.redirect('/login')
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.json({ errors: info })
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.json({ msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/')
      })
    })(req, res, next)
  })

  app.get('/login', (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.json({ message: 'login message' })
  })

  app.get('/signup', (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.json({ message: 'GET signUp' })
  })

  app.post('/signup', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password must be at least 4 characters long').len(4)
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)
    req.sanitize('email').normalizeEmail({ remove_dots: false })

    const errors = req.validationErrors()

    if (errors) {
      return res.json({ errors: errors })
      //return res.redirect('/signup')
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password
    })

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        return res.json({ msg: 'Account with that email address already exists.' })
        //return res.redirect('/signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/')
        })
      })
    })
  })

  app.get('/account', passportConfig.isAuthenticated, (req, res) => {
    res.json({
      user: req.user
    })
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
