const express = require("express")
const router = express.Router()
const {createShortUrl,getUrlStats} = require("../controllers/urlController")

router.post("/shorten",createShortUrl)
router.get("/:shortCode/stats", getUrlStats)

module.exports = router