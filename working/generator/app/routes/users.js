var express = require("express")
var router = express.Router()

let html = "<ul>"

for (let i = 0; i < 10000; i++) {
  html += `<li>${i}</li>`
}

html += "</ul>"

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send(html)
})

module.exports = router
