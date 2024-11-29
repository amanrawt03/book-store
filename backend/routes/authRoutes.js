import express from 'express'
const app = express()
const Route= app.router()

Route.get('/login', loginFn)
Route.get('/signup', signupFn)
export default Route