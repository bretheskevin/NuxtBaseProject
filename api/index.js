import {sha256} from 'js-sha256'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode')
const SECRET = "secret"
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// create a sqlite database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')

// create a table with the following columns:
// id: integer primary key
// username: varchar(255)
// password: varchar(255)

db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255)
      )
    `)
})

app.get("/hello", (req, res) => {
  res.send({message: "Hello World!"})
});

app.get("/auth/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwtDecode(token)
  res.send({
    user: {
      username: decoded.username,
      id: decoded.id
    }
  })
})

app.post("/auth/login", (req, res) => {
  const {username, password} = req.body

  db.get(`SELECT * FROM users WHERE username = '${username}'`, (err, row) => {
    if (err) {
      res.status(500).send({message: "Error logging in"})
    } else if (row) {
      if (sha256(password) === row.password) {
        const token = jwt.sign({username: row.username}, SECRET, {expiresIn: '30d'})
        // send the refresh token to the client
        res.send({token})
      } else {
        res.status(401).send({message: "Invalid credentials"})
      }
    }
  })
});

app.post("/auth/register", (req, res) => {
  const {username, password} = req.body
  db.get(`SELECT * FROM users WHERE username = '${username}'`, (err, row) => {
    if (err) {
      res.status(500).send({message: "Error registering"})
    } else if (row) {
      res.status(409).send({message: "Username already exists"})
    } else {
      db.run(`INSERT INTO users (username, password) VALUES ('${username}', '${sha256(password)}')`, (err) => {
        if (err) {
          res.status(500).send({message: "Error registering"})
        } else {
          res.send({message: "Registered successfully"})
        }
      })
    }
  })
});

export default {
  path: '/api',
  handler: app
}
