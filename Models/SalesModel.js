const mongoose = require('mongoose')

const SalesScheme = new mongoose.Schema({
    date: Date,
    items: [
        {
        productId: String,
        productName: String,
        quantity: Number,
        sellingPrice: Number,
        purchasePrice: Number,
        total: Number,
       },
    ],
    totalAmount: Number,
    cashierId: String,
    customerName: String,
    PaymentMethod: String,
    discount:{
        type: Object,
        amount: Number
    },
}, { timestamps: true } )

const SalesModel = mongoose.model("Sales", SalesScheme)
module.exports = SalesModel