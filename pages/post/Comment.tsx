import Link from 'next/link'
import { useUser } from '../../components/user-context'
import { CommentData } from '../../lib/types'
import { parseDate } from '../../lib/utils'

export function Comment({
  comment,
  index,
}: {
  comment: CommentData
  index: number
}) {
  const user = useUser()

  const handleEdit = (commentId: number) => {
    // TODO
    console.log('edit', commentId)
  }

  const handleReply = (commentId: number) => {
    // TODO
  }

  const handleLike = (commentId: number) => {
    // TODO
  }

  return (
    <div
      id={`comment-${index}`}
      className="flex flex-col border p-2 border-gray-600"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <Link href={`#comment-${index}`} className="hover:text-sky-500">
            #{index}
          </Link>
          <Link
            id="author"
            href={`/profile/${comment.author.id}`}
            className="font-bold"
          >
            {comment.author.name}
          </Link>
        </div>
        <div className="text-sm">{parseDate(comment.createdAt)}</div>
      </div>
      <div className="mt-2">{comment.body}</div>
      {user && (
        <div className="flex flex-row justify-around xs:justify-end gap-5">
          {user.id === comment.author.id && (
            <ActionButton
              children="Edit"
              onClick={() => handleEdit(comment.id)}
            />
          )}
          <ActionButton
            children="Reply"
            onClick={() => handleReply(comment.id)}
          />
          <ActionButton
            children="Like"
            onClick={() => handleLike(comment.id)}
          />
        </div>
      )}
    </div>
  )
}

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="text-sm rounded pl-2 pr-2 dark:text-sky-600 hover:dark:text-sky-400"
    >
      {children}
    </button>
  )
}
