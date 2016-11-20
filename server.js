const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const User = require('./models/User')

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = require('./config')[env]

mongoose.Promise = global.Promise
mongoose.connect(config.database.host)
mongoose.connection.on('error', (err) => { console.error('Connection error:', err) })
mongoose.connection.once('open', () => { console.log('Mongo DB connected!') })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

const apiRoutes = express.Router()

app.get('/setup', (req, res) => {
  const newUser = new User({
    email: 'lgabster',
    password: 'lgabster',
    admin: true
  })
  newUser.save((err) => {
    if (err) throw err
    res.json({
      success: true,
      message: `User 'lgabster' already exist.`
    })
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello from API' })
})

apiRoutes.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {
      user.verifyPassword(req.body.password, (err, isMatch) => {
        if (err) { throw err }
        if (!isMatch) { res.json({ success: false, message: 'Authentication failed. Wrong password.' }) }
        const token = jwt.sign(user, config.appSecret, config.tokenOptions)
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      })
    }
  })
})

apiRoutes.use((req, res, next) => {
  const token = req.body.token || req.param('token') || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.appSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    })
  }
})

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'Welcome in best API ever' })
})

apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) { res.json({ error: err }) }
    res.json(users)
  })
})

apiRoutes.post('/user', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err
    if (user) {
      res.json({
        success: false,
        message: `User '${user.email}' already exist.`
      })
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin || false
      })
      newUser.save((err) => {
        if (err) throw err
        res.json({
          success: true,
          message: `User '${req.body.email}' saved successfully`
        })
      })
    }
  })
})

apiRoutes.get('/user/:email', (req, res) => {
  User.findOne({
    email: req.params.email
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({
        success: false,
        message: `User '${req.params.email}' not in DB.`
      })
    } else { res.json(user) }
  })
})

apiRoutes.delete('/user/:email', (req, res) => {
  if (req.decoded._doc.admin) {
    User.find({
      email: req.params.email
    }).remove((err) => {
      if (err) throw err
      res.json({
        success: true,
        message: `User '${req.params.email}' successfull removed`
      })
    })
  } else {
    res.json({
      success: false,
      message: 'Only admin users allow delete permission.'
    })
  }
})

apiRoutes.get('/check', (req, res) => { res.json(req.decoded) })

app.use('/api', apiRoutes)

module.exports = app
