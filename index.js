const Express = require("express")
const cors = require("cors")
const app = Express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
// const UserRouter = require("./routes/userRoutes.js")
const routes = require("./routes/index.js")

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','Origin','Access-Control-Allow-Origin','Accept','Options','X-Requested-With']
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