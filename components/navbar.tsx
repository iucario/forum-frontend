import Link from 'next/link'
import { useUser } from './user-context'

export default function Navbar() {
  const user = useUser()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  return (
    <header className="w-full bg-sky-700 p-2 text-white">
      <div className="mx-auto max-w-3xl flex flex-row justify-between items-center">
        <div id="nav" className="flex flex-row gap-3 items-center">
          <Link href="/" className="text-lg">
            Home
          </Link>
          <Link href="/compose" className="">
            New Post
          </Link>
        </div>
        <div id="user" className="flex flex-row gap-3 items-center">
          {user ? (
            <>
              <Link href={`/profile/${user.id}`} className="font-bold">
                {user.name}
              </Link>
              <button
                aria-label="logout"
                onClick={handleLogout}
                className="p-1"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="">
              Sign up/Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
