const generateShortCode = require("../utils/generateShortCode")
const Url = require("../models/urlModel")
const AppError = require("../utils/appError")
const asyncHandler = require("../utils/asyncHandler")

const createShortUrl = asyncHandler(async (req, res, next) => {
    let { originalUrl } = req.body
     if (!originalUrl) {
        return next(new AppError("URL is required", 400))
    }
    try {
        new URL(originalUrl)
    } catch (error) {
        return next(new AppError("Invalid URL", 400))
    }
    let shortCode = generateShortCode()
    while (await Url.findOne({ shortCode })) {
        shortCode = generateShortCode()
    }
    const newUrl = new Url({
        originalUrl,
        shortCode
    })

    await newUrl.save()
    return res.status(201).json({

        "success": true,
        "shortCode": shortCode,
        "originalUrl": originalUrl

    })

})

const redirectUrl = asyncHandler(async (req, res, next) => {
    let { shortCode } = req.params
    let url = await Url.findOne({ shortCode })
    if (!url || url === null) {
        return next(new AppError("Short URL not found", 404))
    }
    url.clicks += 1;
    await url.save()
    res.redirect(url.originalUrl)
})


const getUrlStats = asyncHandler(async (req, res, next) => {

    let { shortCode } = req.params;
    let url = await Url.findOne({ shortCode })
    if (!url) {
        return next(new AppError("Short URL not found", 404))
    }
    res.status(200).json({
        success: true,
        data: {
            originalUrl: url.originalUrl,
            clicks: url.clicks,
            createdAt: url.createdAt
        }
    });
})
module.exports = { createShortUrl, redirectUrl, getUrlStats }