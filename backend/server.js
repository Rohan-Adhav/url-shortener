require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/db")
const urlRoutes = require("./routes/urlRoutes")
const AppError = require("./utils/appError")
const cors = require("cors")
const { redirectUrl } = require("./controllers/urlController")
const errorMiddleware = require("./middlewares/errorMiddleware")    
const apiLimiter = require("./middlewares/rateLimitMiddleware");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000

app.use(cors({
   origin: process.env.FRONTEND_URL,
    credentials:true
}))
morgan("combined")
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({ "success": true, "message": "Server is running" })
})

app.use("/api/url",apiLimiter,urlRoutes)
app.get("/:shortCode", redirectUrl)

app.use((req,res,next)=>{
    next(new AppError("Route Not Found",404))
})

app.use(errorMiddleware)

connectDB();

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})


