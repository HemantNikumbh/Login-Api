const express = require("express")
const router = express.Router()
const login = require("../Controller/user_controller")

router.post("/login",login)

module.exports = router