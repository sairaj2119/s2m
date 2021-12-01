import { Request, Response } from 'express'
import createError from 'http-errors'
import { redis } from '../config/redis'
import prisma from '../../prisma'
import { createNotification } from '../utils/notifications'

export const likeAndUnlikePost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const userId = req.user.uid

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      like: true,
    },
  })

  if (!post) throw createError(404, 'post not found')

  const liked: boolean = post.like.filter((like) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
      include: {
        post: true,
      },
    })
    res.json({ liked: true })
    await createNotification({
      type: 'like_post',
      post_id: postId,
      userIdWhoCausedNotification: req.user.uid,
      userIdWhoReceivesNotification: post.userId,
    })

    return
  } else {
    const likeId = post.like.filter((like) => like.userId === userId)[0].id
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    })
    res.json({ unliked: true })
    await redis.publish('NOTI', `${req.user.email} unliked some post`)
    return
  }
}
