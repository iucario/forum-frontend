import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import { PostListItem } from '../components/post-list-item'
import { getPostList } from '../lib/api'
import { PostData } from '../lib/types'

export default function Home() {
  const [postList, setPostList] = useState<PostData[]>([])
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const router = useRouter()
  const page = parseInt(router.query.page as string) || 1
  const PAGESIZE = 20

  useEffect(() => {
    const fetchPostList = async () => {
      const resp = await getPostList(page)
      setPostList(resp)
    }
    if (router.isReady) fetchPostList()

    setHasPrev(page > 1)
  }, [router.isReady, page])

  useEffect(() => {
    setHasNext(postList.length === PAGESIZE) // TODO: this info should be in the response
  }, [postList])

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="">
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        <ul className="">
          {postList.map((x) => (
            <PostListItem post={x} key={x.id} />
          ))}
        </ul>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </section>
    </Layout>
  )
}

function Pagination({
  page,
  hasPrev,
  hasNext,
}: {
  page: number
  hasPrev: boolean
  hasNext: boolean
}) {
  const Button = ({
    page,
    text,
    active,
  }: {
    page: number
    text: string
    active: boolean
  }) => {
    const activeClass =
      'w-16 border border-gray-600 hover:bg-gray-300 dark:border-gray-300 dark:hover:text-gray-200 '
    const inactiveClass =
      'w-16 border border-gray-600 dark:border-gray-300 dark:hover:text-gray-200 hover:cursor-not-allowed text-gray-500'
    return (
      <Link
        href={{ pathname: '/', query: { page } }}
        className={active ? activeClass : inactiveClass}
      >
        {text}
      </Link>
    )
  }

  return (
    <div className="flex flex-row justify-center text-center gap-2 m-2 text-gray-700 dark:text-gray-300">
      {hasPrev ? (
        <Button page={page - 1} text="Prev" active={true} />
      ) : (
        <Button page={page} text="Prev" active={false} />
      )}
      <div className="w-16 border text-sky-600  border-gray-600  dark:border-gray-300 dark:hover:text-gray-200 font-bold">
        {page}
      </div>
      {hasNext ? (
        <Button page={page + 1} text="Next" active={true} />
      ) : (
        <Button page={page} text="Next" active={false} />
      )}
    </div>
  )
}
