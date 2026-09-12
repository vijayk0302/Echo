import express from 'express'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dns from "dns"
import cors from 'cors'
dns.setServers(['8.8.8.8', '8.8.4.4'])


const app=express()

app.use(cors())
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)


export default app