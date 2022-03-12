import './config/dotenv'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import errorMiddleware from './middlewares/error'
import compression from 'compression'
import routes from './routes'

//
;(() => {
  const app = express()

  // middlewares
  app.use(compression({}))
  app.use(morgan('dev'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://s2media.sairaj.rocks'],
    })
  )

  // Routes
  app.get('/health', async (_, res) => {
    res.send('OK ✅\n')
  })

  app.use('/api/v1/auth', routes.authRoutes)
  app.use('/api/v1/user', routes.userRoutes)
  app.use('/api/v1/user/follow', routes.followRoutes)
  app.use('/api/v1/post', routes.postRoutes)
  app.use('/api/v1/post/like', routes.likeRoutes)
  app.use('/api/v1/post/save', routes.saveRoutes)
  app.use('/api/v1/post/comment', routes.commentRoutes)
  app.use('/api/v1/post/comment/reply', routes.replyRoutes)
  app.use('/api/v1/post/comment/like', routes.commentLikeRoutes)
  app.use('/api/v1/post/reply/like', routes.replyLikeRoutes)
  app.use('/api/v1/settings/profileType', routes.settingsRoutes)
  app.use('/api/v1/notification', routes.notificationRoutes)
  app.use('/api/v1/recommendation', routes.recommendationRoutes)

  app.use(errorMiddleware)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`)
  })
})()
