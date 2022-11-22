import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { PostListItem } from '../../components/post-list-item'
import { getProfile, getUserPosts } from '../../lib/api'
import { PostData, UserData } from '../../lib/types'
import { parseDate } from '../../lib/utils'

export default function Profile() {
  const [profile, setProfile] = useState<UserData | null>(null)
  const [postList, setPostList] = useState<PostData[]>([])
  const router = useRouter()
  const id = router.query.id as string

  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await getProfile(id)
      setProfile(resp)

      const postList = await getUserPosts(id)
      setPostList(postList)
    }
    if (router.isReady) fetchProfile()
  }, [router.isReady])

  if (!profile) {
    return <Layout>No such user</Layout>
  } else {
    return (
      <Layout>
        <Head>
          <title>{profile.name} </title>
        </Head>
        <div id="content" className="m-2">
          <div id="user-stats" className="flex flex-col m-5">
            <div id="name" className="text-xl font-bold">
              {profile.name}
            </div>
            <div>User id: {profile.id}</div>
            <div>Created at: {parseDate(profile.createdAt)}</div>
            <div
              id="stats"
              className="flex flex-row justify-around text-center"
            >
              <Count name="Posts" count={profile.postCount} />
              <Count name="Comments" count={profile.commentCount} />
              <Count name="Files" count={profile.fileCount} />
            </div>
          </div>
          <div id="post-list">
            post list
            <ul className="">
              {postList.map((x) => (
                <PostListItem post={x} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

function Count({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex flex-col bg-slate-100 p-2 rounded-lg w-24 dark:bg-slate-600">
      <div className="text-gray-600 dark:text-gray-200">{name}</div>
      <div className="text-sky-600 dark:text-sky-300">{count}</div>
    </div>
  )
}
