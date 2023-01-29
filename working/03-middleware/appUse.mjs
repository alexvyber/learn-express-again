import express from "express"
const app = express()

// Express = 2 things
// 1. Router
// 2. Middleware that comprises a webframework

// Req ---MIDDLEWARE---> Res
// Middleware function is ANY function that has access to the req, res, next object.

// Req ---MIDDLEWARE---> Res
// 1. Request comes in.
// 2. We need to validate the user, sometimes.
// 3. We need to store some things in the DB.
// 4. If there is data from the user we need to parse it and store it
// 5. Res

const first = (req, res, next) => {
  // get info out of the req object
  // do some stuff with the DB

  res.locals.first = true

  console.log("🚀 ~ validateUser ~ res.locals.validated", res.locals.validated)

  next()
}

const validateUser = (req, res, next) => {
  // get info out of the req object
  // do some stuff with the DB
  res.locals.validated = true

  console.log("🚀 ~ first ~ res.locals.first", res.locals.first)

  next()
}

const last = (req, res, next) => {
  // get info out of the req object
  // do some stuff with the DB
  res.locals.validated = true
  console.log("🚀 ~ validateUser ~ res.locals.validated", res.locals.validated)

  // res.send("motherfucker")
  next()
}

// This will run validateUser on ALL paths, all methods!
app.use(validateUser)

// this will run validateUser on /admin, all methods!
app.use("/admin", [first, validateUser, last])

// this will run validateUser on /, all methods!
app.use("/", [first, validateUser, last])

// this will run validateUser on /, only on get methods! And, by the way, it looks like this...
app.get("/", validateUser)

// this will run array of middlewares on get method and / path
app.get("/", [first, validateUser, last], (req, res, next) => {
  res.send("<h1>Main Page!!!</h1>")
  // console.log(res.locals.validated)
})

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>")
  // console.log(res.locals.validated)
})

app.listen(3000)
