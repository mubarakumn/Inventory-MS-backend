const mongoose = require('mongoose')

const ProductScheme = new mongoose.Schema({
    productName: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    description: {
        type: String,
    },
    purchasePrice: {
        type: Number,
        require: true
    },
    sellingPrice: {
        type: Number,
        require: true
    },
},
    {
        timestamps: true
    }
)
const ProductModel = mongoose.model('Product', ProductScheme)

module.exports = ProductModel