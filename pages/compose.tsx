import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Editor } from '../components/editor'
import Layout from '../components/layout'
import { postPost } from '../lib/api'

export default function Compose() {
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const router = useRouter()

  const handleInputBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSend = async () => {
    console.log('Sending', body)
    try {
      const postData = await postPost(title, body)
      router.push(`/post/${postData.id}?page=1`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Compose</title>
      </Head>
      <section className="flex flex-col gap-5 items-center justify-center w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold">Compose</h1>
        <div className="flex flex-row w-full gap-2">
          <span>Title:</span>
          <input
            onInput={handleInputTitle}
            className="border border-gray-400 w-full p-1"
          ></input>
        </div>
        <div className="flex flex-row w-full gap-2">
          <span>Body:</span>
          <Editor
            handleInput={handleInputBody}
            handleSend={() => handleSend()}
          />
        </div>
      </section>
    </Layout>
  )
}
