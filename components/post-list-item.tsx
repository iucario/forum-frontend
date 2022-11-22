import Link from 'next/link'
import { PostData } from '../lib/types'
import { relativeDate } from '../lib/utils'

export function PostListItem({ post }: { post: PostData }): JSX.Element {
  return (
    <li
      className=" border border-x-0 border-gray-500 flex flex-col justify-between p-2  "
      key={post.id}
    >
      <Link
        id="post-title"
        href={{ pathname: `/post/${post.id}`, query: { page: 1 } }}
        className="font-bold w-fit hover:underline"
      >
        <h2>{post.title}</h2>
      </Link>
      <div
        id="post-info"
        className="flex flex-row justify-items-center gap-1 text-sm"
      >
        <Link
          href={`/profile/${post.author.id}`}
          className="font-bold hover:underline"
        >
          {post.author.name}
        </Link>
        <span
          title="comments"
          className="rounded pl-1 pr-1 w-6 text-center bg-sky-600 text-white dark:bg-sky-800"
        >
          {post.commentCount}
        </span>
        <span title="created" className="text-gray-700 dark:text-gray-400">
          Created: {relativeDate(post.createdAt)}
        </span>
        <span title="active" className="text-gray-700 dark:text-gray-400">
          Last reply: {relativeDate(post.activeAt)}
        </span>
      </div>
    </li>
  )
}
