//! USER
export const GET_PROFILE_USER = {
  queryKey: (username: string) => {
    return ['user', username]
  },
  path: (username: string) => {
    if (username && username.trim() !== '') {
      return `/user/${username}`
    }
    return ''
  },
}

export const GET_PROFILE_USER_POSTS = {
  queryKey: (username: string) => {
    return ['user', 'post', username]
  },
  path: (queryString: string) => {
    return `/post${queryString}`
  },
}

//! POST
export const GET_ONE_POST = {
  queryKey: (postId: string) => {
    return ['post', postId]
  },
  path: (postId: string) => {
    return `/post/${postId}`
  },
}

//! COMMENT
export const GET_COMMENTS_FOR_POST = {
  queryKey: (postId: string | undefined) => {
    return ['post', { id: postId, comment: true }]
  },
  path: (postId: string | undefined, cursor: string) => {
    return `/post/comment/${postId}?cursor=${cursor}`
  },
}

export const POST_COMMENT = {
  path: (postId: string) => `/post/comment/${postId}`,
}

export const EDIT_COMMENT = {
  path: (postId: string, commentId: string) => `/post/comment/${postId}/${commentId}`,
}

export const DELETE_COMMENT = {
  path: (postId: string, commentId: string) => {
    return `/post/comment/${postId}/${commentId}`
  },
}

export const CREATE_COMMENT_LIKE = {
  path: (commentId: string) => {
    return `/post/comment/like/${commentId}`
  },
}

//! REPLY
export const GET_REPLIES_FOR_COMMENT = {
  queryKey: (commentId: string) => {
    return ['reply', { commentId }]
  },
  path: (postId: string, commentId: string, cursor: string) => {
    return `/post/comment/reply/${postId}/${commentId}?cursor=${cursor}`
  },
}

export const POST_REPLY = {
  path: (postId: string, commentId: string | undefined) =>
    `/post/comment/reply/${postId}/${commentId}`,
}

export const EDIT_REPLY = {
  path: (postId: string, commentId: string, replyId: string) =>
    `/post/comment/reply/${postId}/${commentId}/${replyId}`,
}

export const DELETE_REPLY = {
  path: (postId: string, commentId: string, replyId: string) =>
    `/post/comment/reply/${postId}/${commentId}/${replyId}`,
}

export const CREATE_REPLY_LIKE = {
  path: (replyId: string) => {
    return `/post/reply/like/${replyId}`
  },
}
