import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CommentEditor from '../../components/editor'
import Layout from '../../components/layout'
import { useUser } from '../../components/user-context'
import { getPostDetail } from '../../lib/api'
import { PostDetailData } from '../../lib/types'
import { parseDate } from '../../lib/utils'
import { Comment } from './Comment'

export default function Post() {
  const [postDetail, setPostDetail] = useState<PostDetailData | null>(null)
  const [totalPage, setTotalPage] = useState(1)
  const user = useUser()
  const router = useRouter()
  const id = router.query.id as string
  const page = (router.query.page as string) || '1'
  const SIZE = 20

  useEffect(() => {
    if (!router.isReady) return
    const fetchPostDetail = async () => {
      const resp = await getPostDetail(id, page)
      setPostDetail(resp)
      if (resp !== null)
        setTotalPage(Math.max(1, Math.ceil(resp.commentCount / SIZE)))
    }
    fetchPostDetail()
  }, [router.isReady, page])

  if (postDetail !== null) {
    return (
      <Layout>
        <Head>
          <title>Demo - {postDetail.title} </title>
        </Head>
        <div aria-label="post-detail" className="flex flex-col mt-5">
          <div id="post" aria-label="post" className="border border-gray-600">
            <div className="p-2">
              <h1 id="title" className="text-3xl font-bold mt-5 mb-5">
                {postDetail.title}
              </h1>
              <div id="post-body" className="mt-5 ">
                {postDetail.body}
              </div>
            </div>
            <hr className="mt-3 mb-3 border-gray-600" />
            <div id="post-info" className="p-2">
              <Link
                href={`/profile/${postDetail.author.id}`}
                className="font-bold"
              >
                {postDetail.author.name}
              </Link>
              <div className="text-sm">
                Comments:{' '}
                <span className="font-bold">{postDetail.commentCount}</span>
              </div>
              <div className="text-sm">
                Created: {parseDate(postDetail.createdAt)}
              </div>
              <div className="text-sm">
                Updated: {parseDate(postDetail.updatedAt)}
              </div>
              <div className="text-sm">
                Last reply: {parseDate(postDetail.activeAt)}
              </div>
            </div>
          </div>

          <Pagination page={parseInt(page)} totalPage={totalPage} />

          <div aria-label="comments" id="comments" className="mt-5">
            {postDetail.comments.map((x, i) => (
              <Comment
                comment={x}
                index={SIZE * parseInt(page) + i + 1}
                key={x.id}
              />
            ))}
          </div>

          <Pagination page={parseInt(page)} totalPage={totalPage} />
        </div>
        {user && <CommentEditor postId={id} />}
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Head>
          <title>loading</title>
        </Head>
        <h1>No such post</h1>
      </Layout>
    )
  }
}

function Pagination({ page, totalPage }: { page: number; totalPage: number }) {
  const router = useRouter()
  const [gotoPage, setGotoPage] = useState<string>(page.toString())

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGotoPage(e.target.value)
  }

  const handleGotoPage = () => {
    console.log('goto', gotoPage)
    router.push({
      query: { id: router.query.id, page: gotoPage },
    })
  }

  return (
    <div
      aria-label="pagination"
      className="flex flex-row justify-center gap-5 p-2"
    >
      <PaginationButton page={page} text="Prev" />
      <div className="underline text-sky-600">{page}</div>
      <PaginationButton page={page} text="Next" />
      <div aira-label="goto-page" className="flex flex-row gap-1">
        <label htmlFor="goto-page-input">Page:</label>
        <input
          aria-label="goto-page-input"
          id="goto-page-input"
          type="number"
          min="1"
          max={totalPage}
          defaultValue={page}
          onChange={handleInput}
          className="w-12 border border-gray-600 pl-1"
        />
        <span>/{totalPage}</span>
        <button
          onClick={handleGotoPage}
          className="w-10 border border-gray-600"
        >
          Go
        </button>
      </div>
    </div>
  )
}

function PaginationButton({ page, text }: { page: number; text: string }) {
  return (
    <Link
      href={{ pathname: '/', query: { page } }}
      className="hover:text-sky-600"
    >
      {text}
    </Link>
  )
}
