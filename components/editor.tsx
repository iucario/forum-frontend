import { useRouter } from 'next/router'
import { useState } from 'react'
import { postComment } from '../lib/api'

export default function CommentEditor({
  postId,
}: {
  postId: string
}): JSX.Element {
  const [body, setBody] = useState<string>('')
  const router = useRouter()

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const handleSend = () => {
    console.log('Sending', body)
    try {
      postComment(postId, body)
      router.reload() // TODO: scroll to the bottom. Put an id on some div in the footer.
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <h1 className="text-lg font-bold">Reply:</h1>
      <Editor handleInput={handleInput} handleSend={() => handleSend()} />
    </>
  )
}

export function Editor({
  handleInput,
  handleSend,
}: {
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSend: () => void
}) {
  return (
    <div className="w-full">
      <textarea
        onInput={handleInput}
        className="border w-full h-20 p-2 border-gray-400"
        placeholder="Say something..."
      />
      <button
        onClick={handleSend}
        className="rounded p-1 pl-3 pr-3 bg-sky-500 text-white float-right"
      >
        Send
      </button>
    </div>
  )
}
