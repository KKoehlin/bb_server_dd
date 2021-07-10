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

/* Character Update */
router.put("/:id", validateJWT, async (req, res) => {
    const {name, race, gender, age, alignment, profession, trait} = req.body.character
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
                owner_id: ownerId
            }
        }

        await CharModel.destroy(query)
        res.status(200).json({ message: "Character Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router