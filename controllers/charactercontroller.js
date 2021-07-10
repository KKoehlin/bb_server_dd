let Express = require("express")
let router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { CharModel } = require("../models")


/* Character Create */
router.post("/create", validateJWT, async (req, res) => {
    const {name, race, gender, age, alignment, profession, trait} = req.body.character
    const {id} = req.user
    const characterEntry = {
        name,
        race,
        gender,
        age,
        alignment,
        profession,
        trait,
        owner: id
    }
    try {
        const newCharacter = await CharModel.create(characterEntry)
        res.status(200).json(newCharacter)
    } catch (err) {
        res.status(500).json({error: err})
    }
    CharModel.create(characterEntry)
})

/* Get all Characters by User */
router.get("/", validateJWT, async (req, res) => {
    const {id} = req.user
    try {
        const userCharacters = await CharModel.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userCharacters)
    } catch (err) {
        res.status(500).json({error:err})
    }
})

/* Get Character by Name */
router.get("/:name", async (req, res) => {
    const {name} = req.params
    try {
        const results = await CharModel.findAll({
            where: {name: name}
        })
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

module.exports = router