import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()

//other packages
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import 'express-async-errors'

//db
import connectDb from './db/connect.js'

//middleware
import errorHandlerMiddleware from './midlleware/error-handler.js'
import notFoundMiddleware from './midlleware/not-found.js'

//router
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()