import React from 'react'
import { paths } from '../../../utils/paths'
import { Avatar } from '../../atoms/Avatar'
import { Link } from '../../Link'
import { CommentReplyAction } from './c-r-actions'
import { CommentReplyText } from './c-r-text'

export const Comment = ({ comment }: { comment: any }) => {
  return (
    <div className="my-3">
      <div className="flex items-start ">
        <Link to={paths.profile({ username: comment.user.username })}>
          <Avatar src={comment.user.avatar} w="w-10" h="h-10" alt="user profile image" />
        </Link>
        <div className="flex-1">
          <CommentReplyText crEntity={comment} isReply={false} />
          <CommentReplyAction
            isReply={false}
            replyCount={comment._count.reply}
            commentId={comment.id}
            postId={comment.postId}
            crEntity={comment}
          />
          {comment.reply.length > 0 ? (
            <div>
              {comment.reply.map((reply: any) => (
                <div className="flex items-start mt-3" key={reply.id}>
                  <Link to={paths.profile({ username: reply.user.username })}>
                    <Avatar src={reply.user.avatar} w="w-10" h="h-10" alt="user profile image" />
                  </Link>
                  <div className="flex-1">
                    <CommentReplyText crEntity={reply} isReply={true} />
                    <CommentReplyAction
                      isReply={true}
                      commentId={comment.id}
                      postId={comment.postId}
                      crEntity={reply}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}