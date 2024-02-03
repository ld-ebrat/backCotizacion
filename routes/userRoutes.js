const Express = require("express");
const router = Express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        let token = req.headers['authorization'];
        let resultadoToken = jwt.verify(token, '@Ebrat182529');

        let usuario = await User.findOne({
            where: {
                id: resultadoToken.id
            },
            attributes: { exclude: ['password'] }
        });
        req.user = usuario;
        next();
    } catch (err) {
        console.log("Error al realizar la autenticacion")
    }
}

router.get("/get-infoUser", auth, async (req, res) => {
    if(req.user){
        const user = req.user
        res.status(200).json(user)
    }else{
        res.status(500).json({error: "Error"})
    }
})

router.get("/get-all-user", async (req, res) => {
    const user = await User.findAll({
        attributes: { exclude: ['password'] }
    })
    res.json(user)
})

router.post("/getInfo", async (req,res)=>{

    console.log(req.body)

    const user = await User.findOne({
        where: {
            id : req.body.userId
        },
        attributes: { exclude: ['password'] },
        include: "City"
    })

    console.log("User ",user)
    res.status(200).json(user)
})

router.post("/validateUser", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        user !== null ? (res.json({ message: "Correo ya Existe" })) : (res.json({ message: "ok" }))
    } catch (error) {
        res.json(error)
    }
})
router.post("/singup", async (req, res) => {
    try {
        const user = await User.create({
            CityId: req.body.CityId,
            fullname: req.body.name,//
            email: req.body.email, //
            password: req.body.pass, //
            phone: req.body.phone, //
            address: req.body.address, //
            description: req.body.details,//
            imag: req.body.imgSelect,
            role: "USER"
        })

        const token = jwt.sign({ id: user.id }, "@Ebrat182529", { expiresIn: '180000s' })
        res.json({ token, id: user.id })
    } catch (error) {
        res.json({ "error": error })
    }
})

router.post("/login", async (req, res) =>{

    console.log(req.body)
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if(user !== null){
            console.log("Entre")
            if(user.password === req.body.pass){
                console.log("Entre aca")
                const token = jwt.sign({id: user.id}, "@Ebrat182529", {expiresIn : "180000s"})
                res.json({token, id: user.id, message: "OK"})
            }else{
                console.log("Entre mas bien aca")
                res.json({message: "Contraseña Incorrecta"})
            }
        }else{
            console.log("Entre en otro lado")
            res.json({message: "Correo Incorrecto o no Existe"})
        }
    } catch (error) {
        
    }
})


module.exports = router;