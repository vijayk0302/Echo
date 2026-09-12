import "dotenv/config"
import app from './src/app.js'
import connectdb from "./src/config/db.js"

const port=process.env.PORT||8080


app.listen(port,()=>{
    connectdb()
    console.log(`server is up and running on http://localhost:${port}`)
})
