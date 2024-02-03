const Express = require("express");
const router = Express.Router();
const {City} = require("../models")

router.post("/getcity", async (req,res)=>{
    console.log(req.body)
    const stateid = req.body.stateid
    try {
        const city = await City.findAll({
            where: {
                StateId: stateid
            }
        })
        res.json(city)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router