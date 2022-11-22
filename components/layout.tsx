import Head from 'next/head'
import { useEffect } from 'react'
import { useUser } from './user-context'
import Navbar from './navbar'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser()

  useEffect(() => {}, [])

  return (
    <div className="w-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar />
      <main className="mx-auto max-w-3xl">{children}</main>
    </div>
  )
}
