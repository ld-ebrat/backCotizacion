const Express = require("express");
const router = Express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        console.log("Entre aca, en este lado")
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
        res.send(err)
        
    }
}

router.get("/getAuthUser", async (req,res)=>{
    console.log("Entre bie bien")
})
router.get("/get-infoUser", auth, async (req, res) => {
    console.log("\nEste es el body", req.user)
    console.log("tamben aca entre")
    if(req.user){
        const user = req.user
        res.json(user)
    }else{
        console.log("Mas bien entre por este lado")
        res.json({error: "Error"})
    }
})

router.get("/get-all-user", async (req, res) => {
    const user = await User.findAll({
        where: {
            role: "USER"
        },
        attributes: { exclude: ['password', "email", "phone"] }
    })
    res.json(user)
})

router.get("/getUsers", async (req,res)=>{
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.json({"Erro": error})
    }
})

router.post("/getInfo", async (req,res)=>{

    const user = await User.findOne({
        where: {
            id : req.body.userId
        },
        attributes: { exclude: ['password'] },
        include: "City"
    })
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

router.post("/login", async (req,res) =>{
    console.log(req.body)
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if(user !== null){
            if(user.password === req.body.pass){
                const token = jwt.sign({id: user.id}, "@Ebrat182529", {expiresIn : "180000s"})

                if(user.role === "ADMIN"){
                    res.json({token, id: user.id, message: "OK", type:true})
                }
                res.json({token, id: user.id, message: "OK"})
            }else{
                res.json({message: "Contraseña Incorrecta"})
            }
        }else{
            res.json({message: "Correo Incorrecto o no Existe"})
        }
    } catch (error) {
        console.log(error)
        res.json({message: error})
    }
})


module.exports = router;