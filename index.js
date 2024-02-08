const Express = require("express")
const cors = require("cors")
const app = Express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
const routes = require("./routes/index.js")

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', "OPTIONS", "PUT"],
    allowedHeaders: ['Content-Type', 'authorization',"X-Powered-By","Access-Control-Allow-Origin"]
}
app.use(cors(corsOptions))
app.use(Express.json())
app.use('/images', Express.static(path.join(__dirname, 'images')));
routes(app)


app.get("/", (req,res) =>{
    res.send("Hola")
})

app.listen(4000, ()=>{
    console.log("Corriendo en el puesto 4000")
})