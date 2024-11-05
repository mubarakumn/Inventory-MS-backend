const ProductModel = require("../Models/ProductModel");

const addProduct = async(req, res)=>{
    const {productName, brand, quantity, description, purchasePrice, sellingPrice} = req.body;

    try {
        const response = await ProductModel.create({
            productName,
            brand,
            quantity,
            description,
            purchasePrice,
            sellingPrice
        })
        if(response){
            res.status(201).json({
                message: "Product Added Successful",
                data: response
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async(req, res)=>{
    try {
        const response = await ProductModel.find({})
        if(response){
            res.status(200).json({
                response,
                message: "Products retrieved Sucessfully!"
            })
        }
    } catch (error) {
        res.status(500).json({error})
        console.log(error);
    }
}


const updateProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const response = await ProductModel.findByIdAndUpdate(id, req.body)
        if(response){
            res.status(200).json({message: "Product updated sucessfully!"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const deleteProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const response = await ProductModel.findByIdAndDelete({_id: id})
        if(response){
            res.json({
                message: "Product Deleted Sucessfully!"
            })
        }
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}
module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}