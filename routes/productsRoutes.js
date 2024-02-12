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

router.put("/update/url/product", (req,res)=>{
    const user = req.body.user.split("@")[0]
    
    try {
        Product.findAll({
            where: {
                UserId: req.body.id
            }
        }).then(ress => {
            try {
                ress.forEach(element => {
                    var urlProduct = element.dataValues.imag.split("/")
                    console.log("-",urlProduct,"-")
                    urlProduct[2] = user
                    try {
                        Product.update({
                            imag: urlProduct.join("/")
                        },{
                            where:{
                                id: element.dataValues.id
                            }
                        }).then(resp => {
                            console.log(resp)
                        })
                    } catch (error) {
                        res.json({"Error ": error})
                    }
                })
                
                res.json({message: "OK"})
            } catch (error) {
                res.json({"Error": error })
            }
        })

    } catch (error) {
        console.log("Error", error)
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