const Express = require("express")
const router = Express.Router()
const upload = require("express-fileupload")
const fs = require("fs");

router.use(upload())

router.post("/save/img/profile", async (req, res) => {
    console.log("Img", req.body.user)
    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    fs.mkdirSync(`./images/${user}/`, { recursive: true });

    file.mv(`./images/${user}/profile.${extension}`, function (err) {
        if (err) {
            res.json(err)
        } else {
            res.json({ url: `/images/${user}/profile.${extension}` })
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
        if (err) {
            res.json(err)
        } else {
            res.json({ url: directory })
        }
    })
})

router.post("/update/img/product", async (req, res) => {

    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const name = req.body.name
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const urlImgDelete = req.body.imgDelete
    const directory = `/images/${user}/product/${Date.now()}_${name}.${extension}`

    fs.unlink(`.${urlImgDelete}`, (err) => {
        if (err) {
            res.json({ message: "Error al actualizar la imagesen" })
        }
    })

    file.mv(`.${directory}`, (err) => {
        if (err) {
            res.json(err)
        } else {
            res.json({ url: directory })
        }
    })
})

router.post("/rename/dir/profile", async (req, res) => {
    const dir = req.body.user.split("@")[0]
    const extension = req.body.url.split(".").at(-1)
    const dirRename = req.body.dirRename.split("@")[0]
    fs.rename(`./images/${dir}`, `./images/${dirRename}`, (err) => {
        if (err) {
            console.log(err)
            res.json({ err })
        } else {
            res.json({ url: `/images/${dirRename}/profile.${extension}`, message: "OK" })
        }
    })

})
router.put("/update/img/profile", async (req, res) => {
    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const urlImgDelete = req.body.imgDelete.split("/").at(-1)
    if (req.body.userdelete) {
        const userdelete = req.body.userdelete.split("@")[0]

        fs.renameSync(`./images/${userdelete}`, `./images/${user}`)
        fs.rmSync(`./images/${user}/${urlImgDelete}`, undefined)
        file.mv(`./images/${user}/profile.${extension}`, (err) => {
            if (err) {
                res.json({ message: "Error al guardar la imagesen" })
            } else {
                res.json({ url: `/images/${user}/profile.${extension}`, message: "OK" })
            }
        })
    } else {
        try {
            fs.rmSync(`./images/${user}/${urlImgDelete}`, undefined)
            file.mv(`./images/${user}/profile.${extension}`, (err) => {
                if (err) {
                    res.json({ message: "Error al guardar la imagesen" })
                } else {
                    res.json({ url: `/images/${user}/profile.${extension}`, message: "OK" })
                }
            })
        } catch (error) {
            res.json({error: error})
        }
    }
})

module.exports = router