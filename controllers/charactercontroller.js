let Express = require("express")
let router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")

const { CharModel } = require("../models")

/* Character Create */
router.post("/create", validateJWT, async (req, res) => {
    const {name, location, race, gender, age, alignment, profession, trait} = req.body.character
    const {id} = req.user
    const characterEntry = {
        name,
        location,
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
})

/* Get all Characters by User */
router.get("/", validateJWT, async (req, res) => {
    const {id} = req.user
    try {
        const userCharacters = await CharModel.findAll({
            where: {
                owner: id
            },
            order: [
                ['id' , 'ASC']
            ]
        })
        console.log(userCharacters)
        res.status(200).json(userCharacters)
    } catch (err) {
        res.status(500).json({error:err})
    }
})

/* Get Character by Id */
router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const results = await CharModel.findAll({
            where: {id: id}
        })
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

/* Get Characters by Location */
router.get("/:location", async (req, res) => {
    const {location} = req.params;
    try {
        const locationResults = await CharModel.findAll({
            where: {location: location}
        })
        res.status(200).json(locationResults)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

/* Character Update */
router.put("/:id", validateJWT, async (req, res) => {
    const {name, location, race, gender, age, alignment, profession, trait} = req.body.character
    const charId = req.params.id
    const userId = req.user.id

    const query = {
        where: {
            id: charId,
            owner: userId
        }
    }

    const updatedChar = {
        name: name,
        location: location,
        race: race,
        gender: gender,
        age: age,
        alignment: alignment,
        profession: profession,
        trait: trait
    }

    try {
        const update = await CharModel.update(updatedChar, query)
        res.status(200).json(updatedChar)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/* Character Delete */
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const charId = req.params.id

    try {
        const query = {
            where: {
                id: charId,
                owner: ownerId
            }
        }

        await CharModel.destroy(query)
        res.status(200).json({ message: "Character Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router