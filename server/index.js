require('dotenv').config()
const {sequelize} = require('../util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')


const express = require('express')
const cors = require('cors')

const PORT = 4000
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts')
const {register, login} = require('./controllers/auth')
const {isAuthenticated} = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

//AUTH
app.post('/register', register)
app.post('/login', login)

// GET POSTS - no auth
app.get('/posts', getAllPosts)

// CRUD (create, read, update, delete) POSTS - auth required
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)


app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))