import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import dns from "dns"
import cors from 'cors'
import followRoutes from './routes/follow.routes.js'
import { ENV } from './lib/env.js'
import userRoutes from './routes/user.routes.js'


dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:ENV.FRONT_END,
    credentials:true
}))


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/update',followRoutes)
app.use('/api/user',userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Echo backend is running",
  });
});

export default app