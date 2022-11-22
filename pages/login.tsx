import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'
import { login, register } from '../lib/api'

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()

  const handleLogin = async () => {
    try {
      const { token } = await login(username, password)
      localStorage.setItem('access_token', token)
      localStorage.setItem('token_type', 'Bearer')
      setMessage('Logged in')
      router.push('/')
    } catch (e) {
      console.error(e)
      setMessage(`Login error: Wrong username or password`)
    }
  }

  const checkName = (name: string): boolean => {
    const pattern = /^[a-zA-Z0-9_]{3,20}$/
    return pattern.test(name)
  }

  const checkPassword = (password: string): boolean => {
    const pattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!()]).{8,}$/
    return pattern.test(password)
  }

  const handleSignup = async () => {
    if (!checkName(username)) {
      setMessage('Username must be 3-20 characters long')
      return
    }
    if (!checkPassword(password)) {
      setMessage(
        'Password must be:\n' +
          '- longer than 8 characters\n' +
          '- contain at least one uppercase letter\n' +
          '- one lowercase letter\n' +
          '- one number\n' +
          '- one special character'
      )
      return
    }

    try {
      await register(username, password)
      setMessage('Registered')
      handleLogin()
    } catch (e) {
      console.error(e)
      setMessage(`Signup error: `)
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim())
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim())
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Layout>
      <div className="flex flex-col mx-auto w-64 m-3">
        <h1>Sign up/Log in:</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsernameChange}
          className="border border-gray-400 p-2 rounded m-1"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={handlePasswordChange}
          className="border border-gray-400 p-2 rounded m-1"
        />
        <label aria-label="show-password" className="flex flex-row gap-1 m-1">
          <input type="checkbox" onClick={toggleShowPassword} />
          <span>show password</span>
        </label>
        <button
          onClick={handleLogin}
          className="bg-sky-600 rounded p-1 hover:bg-sky-500 m-1"
        >
          Log in
        </button>
        <button
          onClick={handleSignup}
          className="rounded p-1 m-1 hover:underline"
        >
          Sign up
        </button>
      </div>
      {message && (
        <pre className="rounded border-2 border-sky-600 mx-auto p-2 max-w-lg whitespace-pre-wrap">
          {message}
        </pre>
      )}
    </Layout>
  )
}
