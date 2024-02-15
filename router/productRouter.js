const express = require('express')
const {getAllProducts, getProductById,addNewProduct}=require("../controllers/productService")
const router = express.Router()

router.get('/', getAllProducts)

router.get('/:id', getProductById)

router.post('/',addNewProduct)

module.exports = router;