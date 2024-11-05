const express = require('express')
const { addSales } = require('../Controllers/SalesCtrl.js')
const { getSales } = require('../Controllers/SalesCtrl.js')
const AuthorizedRole = require('../Middleware/AuthorizedRole.js')

const router = express.Router()

router.post("/addSales", AuthorizedRole('admin', 'staff'), addSales)
router.get("/getSales", AuthorizedRole('admin', 'staff'), getSales)

module.exports = router
