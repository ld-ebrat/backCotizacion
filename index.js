const Express = require("express")
const cors = require("cors")
const app = Express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
// const UserRouter = require("./routes/userRoutes.js")
const routes = require("./routes/index.js")

app.use(cors({origin: "*"}))
app.use(Express.json())
routes(app)
app.use('/images', Express.static(path.join(__dirname, 'images')));


app.get("/", (req,res) =>{
    res.send("Hola")
})

app.listen(4000, ()=>{
    console.log("Corriendo en el puesto 4000")
})