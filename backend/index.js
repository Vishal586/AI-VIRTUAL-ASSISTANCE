import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./routes/gemini.js"

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin:"https://ai-virtual-assistance.onrender.com",
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

