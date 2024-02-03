const Express = require("express");
const router = Express.Router();
const { State } = require("../models")

let tokenGlo;

router.post("/create/state", async (req, res) => {
    const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "api-token": "1Af92vR0K_V_bZ9aMdxm68e8QfBjnX8To2hFekRZhkY8-bVbaAn-EA94cRKgfVZFXwE",
            "user-email": "angaritaheiner@gmail.com"
        }
    })

    if (response.ok) {
        const dataToken = await response.json()
        tokenGlo = dataToken.auth_token

        try {
            const responseState = await fetch(`https://www.universal-tutorial.com/api/states/Colombia`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokenGlo}`,
                    "Accept": "application/json"
                }
            })

            if(responseState.ok){
                const dataState = await responseState.json()

                dataState.forEach(async element =>{
                    const state = await State.create({
                        name: element.state_name
                    })
                })
                console.log("\nElementos guardados Correctamente")
                res.send(dataState)
            }
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
})

module.exports = router;