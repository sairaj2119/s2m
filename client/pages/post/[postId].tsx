import { useRouter } from 'next/router'
import React from 'react'
import { NextImage } from '../../components/atoms/Image/image'
import { DotsHorizontal } from '../../components/icons'
import { HeartIcon } from '../../components/icons/HeartIcon'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { PostFoot } from '../../components/molecules/Post/post-foot'
import { PostHead } from '../../components/molecules/Post/post-head'
import PrivateRoute from '../../components/PrivateRoute'
import { useQuery } from '../../hooks/useQuery'

const EachPost = () => {
  const router = useRouter()
  const params = router.query

  const { data: post, loading, error } = useQuery(`/post/${params.postId}`)

  // const { isLoading, data: post, isError } = useQuery(['post', params.postId], async () => {
  //   const post = await axios.get('http://localhost:5000/api/v1/post/' + params.postId)
  //   return post.data
  // })

  if (error) return <h1>Something went wrong</h1>
  if (loading || !post) return <h1>Loading...</h1>

  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Post" />
        <main className="">
          <PostHead post={post} icon={DotsHorizontal} />
          <main>
            <NextImage src={post.url} />
          </main>
          <PostFoot post={post} icon1={HeartIcon} icon2={() => <></>} icon3={() => <></>} />
        </main>
      </div>
    </PrivateRoute>
  )
}

export default EachPost
