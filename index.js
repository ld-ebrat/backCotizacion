const Express = require("express")
const cors = require("cors")
const app = Express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
// const UserRouter = require("./routes/userRoutes.js")
const routes = require("./routes/index.js")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://front-cotizacion.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(Express.json())
app.use('/images', Express.static(path.join(__dirname, 'images')));
routes(app)


app.get("/", (req,res) =>{
    res.send("Hola")
})

app.listen(4000, ()=>{
    console.log("Corriendo en el puesto 4000")
})