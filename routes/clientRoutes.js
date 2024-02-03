const Express = require("express")
const router = Express.Router()
const { Client } = require("../models")

router.post("/create/client", async (req, res)=>{
    console.log(req.body)
    try {
        const client = await Client.create({
            UserId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
    
        res.json(client)
    } catch (error) {
        res.json({"error": error})
    }
})

module.exports = router