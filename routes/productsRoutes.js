const Express = require("express")
const router = Express.Router()
const { Product } = require("../models")

router.post("/get/products", async (req, res)=>{
    try {
        const products = await Product.findAll({
            where:{
                UserId: req.body.userId
            }
        })
        res.json(products)
    } catch (error) {
        res.json({"error": error})
    }
})
router.post("/create/product", async (req, res) => {
    try {
        const product = await Product.create({
            UserId: req.body.idUser,
            name: req.body.name,
            details: req.body.details,
            imag: req.body.selectImg,
            price: req.body.price
        })

        res.status(200).json({product})
    } catch (error) {
        res.json({error})
    }
})

module.exports = router