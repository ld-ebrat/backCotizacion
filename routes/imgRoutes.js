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

    if (!fs.existsSync('./imag')) {
        fs.mkdirSync('./imag/', { recursive: true });
    }
    fs.mkdirSync(`./imag/${user}/`, { recursive: true });

    file.mv(`./imag/${user}/profile.${extension}`, function (err) {
        if(err){
            res.json(err)
        }else{
            res.json({url:`/imag/${user}/profile.${extension}`})
        }
    })

})

router.post("/save/img/product", async (req, res) => {

    const file = req.files.file
    const user = req.body.email.split("@")[0]
    const name = req.body.name
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const directory = `/imag/${user}/product/${Date.now()}_${name}.${extension}`

    fs.mkdirSync(`./imag/${user}/product`, { recursive: true });

    file.mv(`.${directory}`, function (err) {
        if(err){
            res.json(err)
        }else{
            res.json({url:directory})
        }
    })
})

router.post("/update/img/product", async (req, res) =>{

    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const name = req.body.name
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const urlImgDelete = req.body.imgDelete
    const directory = `/imag/${user}/product/${Date.now()}_${name}.${extension}`

    fs.unlink(`.${urlImgDelete}`, (err)=>{
        if(err){
            res.json({message : "Error al actualizar la imagen"})
        }
    })

    file.mv(`.${directory}`, (err) =>{
        if(err){
            res.json(err)
        }else{
            res.json({url:directory})
        }
    })
})

router.post("/rename/dir/profile", async (req,res)=>{

    console.log("Rename Dir ", req.body)
    const dir = req.body.user.split("@")[0]
    const extension =req.body.url.split(".").at(-1)
    console.log(extension)
    const dirRename = req.body.dirRename.split("@")[0]
    fs.rename(`./imag/${dir}`,`./imag/${dirRename}`, (err)=>{
        if(err){
            console.log(err)
            res.json({err})
        }else{
            res.json({url: `/imag/${dirRename}/profile.${extension}`, message: "OK"})
        }
    })

})
router.put("/update/img/profile", async (req, res) => {
    console.log(req.body)
    const file = req.files.file
    const user = req.body.user.split("@")[0]
    const extension = file.name.split(".")[file.name.split(".").length - 1]
    const urlImgDelete = req.body.imgDelete
    
    if(req.body.userdelete){
        const userdelete = req.body.userdelete.split("@")[0]
        console.log(userdelete)

        
        fs.unlink(`./imag/${userdelete}/`, (err)=>{
            if(err){
                console.log("Entre aqui", err)
                res.json({message: "Error al actualizar la imagen"})
            }else{
                console.log("No, entre por aca")
                fs.mkdirSync(`./imag/${user}/`, { recursive: true });
                file.mv(`./imag/${user}/profile.${extension}`, (err) => {
                    if(err){
                        res.json({message: "Error al guardar la imagen"})
                    }else{
                        res.json({url:`/imag/${user}/profile.${extension}`, message: "OK"})
                    }
                })
            }
        })
        
    }else{
        fs.unlink(`.${urlImgDelete}`, (err)=>{
            if(err){
                res.json({message: "Error al actualizar la imagen"})
            }else{
                file.mv(`./imag/${user}/profile.${extension}`, (err) => {
                    if(err){
                        res.json({message: "Error al guardar la imagen"})
                    }else{
                        res.json({url:`/imag/${user}/profile.${extension}`, message: "OK"})
                    }
                })
            }
        })
    }

})

module.exports = router