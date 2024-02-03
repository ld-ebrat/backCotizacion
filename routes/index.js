const setState = require("./setState");
const setStateCity = require("./setStateCity");
const stateRoutes = require("./stateRoutes");
const cityRoutes = require("./cityRoutes");
const userRoutes = require("./userRoutes")
const imgRoutes = require("./imgRoutes")
const productRoutes = require("./productsRoutes")
const clientRoutes = require("./clientRoutes")
const quotationRoutes = require("./quotationRoutes")
const quotationProductRoutes = require("./quotationProductRoutes")
const emailRoutes = require("./emails")


module.exports = (app)=>{
    app.use(setState)
    app.use(setStateCity)
    app.use(stateRoutes)
    app.use(cityRoutes)
    app.use(userRoutes)
    app.use(imgRoutes)
    app.use(productRoutes)
    app.use(quotationRoutes)
    app.use(clientRoutes)
    app.use(quotationProductRoutes)
    app.use(emailRoutes)
}