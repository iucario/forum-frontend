import { useEffect, useContext, createContext, useState } from 'react'
import { UserData } from '../lib/types'
import { getCurrentUser } from '../lib/api'

export const UserContext = createContext<UserData | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser was used outside of its Provider')
  }
  return context
}
