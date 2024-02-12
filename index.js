const Express = require("express")
const cors = require("cors")
const app = Express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()
const routes = require("./routes/index.js")

const port = process.env.PORT || 4000

const corsOptions = {
    origin: 'https://front-cotizacion.vercel.app',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', "OPTIONS", "PUT"],
    allowedHeaders: ['Content-Type', 'authorization','Authorization', "X-Powered-By", "Access-Control-Allow-Origin"]
}

app.options('/login', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://front-cotizacion.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end();
});
app.use(cors(corsOptions))
app.use(Express.json())
app.use('/images', Express.static(path.join(__dirname, 'images')));
routes(app)


app.get("/", (req, res) => {
    res.send("Hola")
})

app.listen(port, () => {
    console.log(`Corriendo en el puesto ${port}`)
})