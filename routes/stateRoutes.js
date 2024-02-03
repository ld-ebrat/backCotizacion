const Express = require("express");
const router = Express.Router();
const {State} = require("../models")

router.get("/getstate", async (req,res)=>{
    try {
        const state = await State.findAll()
        res.json(state)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router