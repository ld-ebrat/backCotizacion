const Express = require("express")
const router = Express.Router()
const upload = require("express-fileupload")
const fs = require("fs");

router.use(upload())

router.post("/save/img/profile", async (req, res) => {
    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const extension = file.name.split(".")[file.name.split(".").length - 1]

    fs.mkdirSync(`./images/${user}/`, { recursive: true });

    file.mv(`./images/${user}/profile.${extension}`, function (err) {
        if(err){
            res.json(err)
        }else{
            res.json({url:`/images/${user}/profile.${extension}`})
        }
    })

})

router.post("/save/img/product", async (req, res) => {

    const file = req.files.file
    const user = req.body.email.split("@")[0]
    const name = req.body.name
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const directory = `/images/${user}/product/${Date.now()}_${name}.${extension}`

    fs.mkdirSync(`./images/${user}/product`, { recursive: true });

    file.mv(`.${directory}`, function (err) {
        if(err){
            res.json(err)
        }else{
            res.json({url:directory})
        }
    })
})

module.exports = router