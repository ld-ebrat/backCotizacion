const Express = require("express");
const router = Express.Router();
const nodemailer = require("nodemailer")
const { render } = require("@react-email/render");
const dotenv = require("dotenv")
dotenv.config()

router.post("/send/email", async (req, res) => {
    console.log("Email: ", req.body)
    try {
        let transport = nodemailer.createTransport({
            host: process.env.SMTP_AUTH_HOST,
            port: +process.env.SMTP_AUTH_PORT,
            secure: false,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PASS
            },
            requireTLS: false,
            tls:{
                rejectUnauthorized: true
            },
            pool: true,
            maxConnections: +process.env.SMTP_AUTH_CONNECTIONS,
            maxMessages: +process.env.SMPT_AUTH_MESSAGE
        })
        const html = req.body.html
        try {
            await transport.sendMail({
                subject: "Probando ",
                to: req.body.email,
                html
            })
            res.json({ message: true })
        }catch(error){
            console.log("soy este error: ", error)
            res.json({"error": error})
        }
    } catch (error) {
        console.log("soy este otro error: ", error)
        res.json({ "error": error })
    }

})

module.exports = router