require('dotenv').config()
const jwt = require('jsonwebtoken') //importing jwt for the authentication token
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {  //next is a function in express router & when invoked, executes middleware succedding the current middleware
        const headerToken = req.get('Authorization')

        if (!headerToken) { //if headerToken is not true send this error
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {   //try: defines a code black to run. catch: code block to handle any error. throw: defines a custom error
            token = jwt.verify(headerToken, SECRET)  //i do believe that this is verifying that the headerToken and SECRET and the same and to place that into the variable token
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}