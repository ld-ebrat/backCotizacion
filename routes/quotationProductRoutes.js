const Express = require("express")
const router = Express.Router()
const { QuotationProduct } = require("../models")

router.post("/create/quotationProducts", async (req, res) => {

    console.log(req.body)
    try {
        const quotationProduct = await QuotationProduct.create({
            QuotationId: req.body.quotationId,
            ProductId: req.body.productId,
            amount: req.body.amount,
        })
        res.json(quotationProduct)

    } catch (error) {
        res.json({"error": error})
    }
})
module.exports = router