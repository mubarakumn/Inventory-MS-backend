const express = require('express')
const { addProduct, deleteProduct, getProduct, updateProduct } = require('../Controllers/ProductCtrl')
const AuthorizedRole = require('../Middleware/AuthorizedRole')

const router = express.Router()

router.post('/addProduct', AuthorizedRole('admin'), addProduct)
router.get('/getProduct', AuthorizedRole('admin', 'staff'), getProduct)
router.delete('/deleteProduct/:id', AuthorizedRole('admin'), deleteProduct)
router.put('/updateProduct/:id', AuthorizedRole('admin'), updateProduct)
module.exports = router 