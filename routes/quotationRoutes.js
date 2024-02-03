const Express = require("express")
const router = Express.Router()
const { Quotation } = require("../models")

router.post("/create/quotation", async (req, res)=>{

    try {
        const quotation = await Quotation.create({
            UserId: req.body.userId,
            ClientId: req.body.clientId,
            subTotal: req.body.total,
            total: req.body.total
        })

        res.json(quotation)
    } catch (error) {
        res.json({"error": error})
    }
})
module.exports = router