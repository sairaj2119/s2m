import { Router } from 'express'
import ash from 'express-async-handler'
import { body, param } from 'express-validator'
import { createComment, deleteComment, editComment, getCommentsOfPost, getOneComment } from '../handlers/commentHandler'
import auth from '../middlewares/auth'

const router = Router()

router.get('/:postId', auth, ash(getCommentsOfPost))

router.post(
  '/:postId',
  auth,
  [param('postId').notEmpty(), body('commentText').trim().escape().notEmpty()],
  ash(createComment)
)

router.get(
  '/:postId/:commentId',
  [param('postId').not().isEmpty(), param('commentId').not().isEmpty()],
  auth,
  ash(getOneComment)
)

router.put(
  '/:postId/:commentId',
  [param('postId').isInt().toInt(), param('commentId').isInt().toInt(), body('body').trim().escape().notEmpty()],
  auth,
  ash(editComment)
)

router.delete(
  '/:postId/:commentId',
  [param('postId').isInt().toInt(), param('commentId').isInt().toInt()],
  auth,
  ash(deleteComment)
)

export default router
