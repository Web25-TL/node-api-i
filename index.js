// implement your API here
const express = require('express') // import express

const db = require('./data/db')

const server = express() // created server

server.use(express.json()) // so express uses json

// handle requests to the root  of the api
server.get('/', (req, res) => {
    res.send("hello")
})

// get to /users that returns the list of users
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({ error: "The users information could not be retrieved.", error: err }))
})
// get to find a user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    db.findById(id)
        .then(user => {
            user ?
            res.status(200).json(user) :
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." , error: err})
        })
})
// add user with the insert method of the db
server.post('/api/users', (req, res) => {
    const requestBody = req.body
    const { name, bio } = req.body
    if(!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db.insert(requestBody)
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Please provide name and bio for the user.", error: err })
        })
})
//delete user by id number
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    db.remove(id)
        .then(user => {
            user ? 
            res.json(user) :
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed", error: err })
        })
})

// watching for connections on port 5000
server.listen(5000, () => {
    console.log('running on port 5000')
})

