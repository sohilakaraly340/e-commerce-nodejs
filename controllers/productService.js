const asyncHandler = require('express-async-handler')
const productModel = require("../models/productModel")
const categoryModule = require("../models/categoryModel")

const getAllProducts=asyncHandler(async (req, res) => {
    const productList = await productModel.find() //retrive just name 
    res.status(200).json({ results: productList.length, data: productList });
})

const getProductById=asyncHandler(async (req, res) => {
    const id = req.params.id
    const productList = await productModel.findById({ _id: id }).populate('categories')
    res.status(200).json({ results: productList.length, data: productList });

})

const addNewProduct= asyncHandler(async (req, res) => {
    const category = await categoryModule.findById(req.body.categories)
    if (!category) return res.status(400).send("invalid category")

    const { name, description, categories, brand, price, countInStock, rating, numReviews, isFeatured } = req.body
    const newProduct = await productModel.create({ name, description, categories, brand, price, countInStock, rating, numReviews, isFeatured })
    res.status(201).json({ data: newProduct })

})

module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
}