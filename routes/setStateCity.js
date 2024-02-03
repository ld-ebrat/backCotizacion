const Express = require("express");
const router = Express.Router();
const { City, State } = require("../models")

let tokenGlo;
router.post("/create/statecity", async (req, res) => {
    const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "api-token": "1Af92vR0K_V_bZ9aMdxm68e8QfBjnX8To2hFekRZhkY8-bVbaAn-EA94cRKgfVZFXwE",
            "user-email": "angaritaheiner@gmail.com"
        }
    })

    if (response.ok) {
        const data = await response.json()
        tokenGlo = data.auth_token

        try {
            const state = await State.findAll()
            state.forEach(async elem => {
                    const responseCity = await fetch(`https://www.universal-tutorial.com/api/cities/${elem.dataValues.name}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${tokenGlo}`,
                            "Accept": "application/json"
                        }
                    })

                    if (responseCity.ok) {
                        const dataCity = await responseCity.json()
                        dataCity.forEach(async element => {
                            const city = await City.create({
                                StateId: elem.dataValues.id,
                                name: element.city_name,
                            })
                        })
                    }
            })

            res.send(state)
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = router