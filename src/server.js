import express from "express"
import connectDb from "./config/database";




const app = express()
connectDb()
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
