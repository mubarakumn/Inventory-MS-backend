const SalesModel = require("../Models/SalesModel");
const ProductModel = require("../Models/ProductModel");

// Adding Sales
const addSales = async (req, res) => {
    const { items, cashierId, customerName, PaymentMethod, discount } = req.body;
    try {
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items provided" });
      }
  
      let totalAmount = 0;
  
      for (const item of items) {
        const { productId, quantity } = item;
        const product = await ProductModel.findById(productId);
  
        if (!product) {
          return res.status(404).json({ message: `Product ${productId} not found` });
        }
        if (product.quantity < quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.productName}` });
        }
  
        const itemTotal = product.sellingPrice * quantity;
        totalAmount += itemTotal;
        product.quantity -= quantity;
        await product.save();
      }
  
      if (discount) {
        const { type, amount } = discount;
        if (type === 'percentage') {
          totalAmount -= (totalAmount * amount) / 100;
        } else if (type === 'flat') {
          totalAmount -= amount;
        }
        totalAmount = Math.max(totalAmount, 0);
      }
  
      const newSales = new SalesModel({
        date: new Date(),
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productName,
          sellingPrice: item.sellingPrice,
          purchasePrice: item.purchasePrice,
          total: item.quantity * item.sellingPrice,
        })),
        totalAmount,
        cashierId,
        customerName,
        PaymentMethod,
        discount,
      });
  
      await newSales.save();
      res.status(201).json({ message: 'Sales added successfully', totalAmount, sales: newSales });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
// getting Get Sales
const getSales = async (req, res) => {
    try {
        const response = await SalesModel.find({})
        if (response) {
            res.status(200).json(response)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = {
    addSales,
    getSales
}