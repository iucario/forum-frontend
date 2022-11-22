import { CommentData, PostData, PostDetailData, UserData } from './types'

const HOST = 'http://localhost:8080'

export const register = async (name: string, password: string) => {
  const resp = await fetch(`${HOST}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  })
  if (resp.status === 201) {
    return await resp.json()
  } else {
    throw new Error(`${resp.status} ${resp.text}`)
  }
}

export const login = async (username: string, password: string) => {
  const resp = await fetch(`${HOST}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: username, password }),
  })
  if (resp.status === 200) {
    const { token } = await resp.json()
    return { token }
  } else {
    throw new Error(`${resp.status} ${resp.text}`)
  }
}

export async function getCurrentUser(): Promise<UserData | null> {
  const api = `${HOST}/user/me`
  const token = localStorage.getItem('access_token')
  if (token !== undefined) {
    const resp = await fetch(api, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (resp.ok) {
      return (await resp.json()) as UserData
    }
  }
  return null
}

export async function getProfile(id: string): Promise<UserData | null> {
  const api = `${HOST}/user/profile/${id}`
  const resp = await fetch(api, {
    method: 'GET',
  })
  if (resp.ok) {
    return (await resp.json()) as UserData
  }
  return null
}

export async function getPostList(page: number): Promise<PostData[]> {
  const size = 20
  const offset = (page - 1) * size
  const api = `${HOST}/api/post?offset=${offset}&size=${size}`
  const resp = await fetch(api, {
    method: 'GET',
  })
  if (resp.ok) {
    return (await resp.json()) as PostData[]
  }
  return []
}

export async function getPostDetail(
  id: string,
  page: string
): Promise<PostDetailData | null> {
  const api = `${HOST}/api/post/${id}?page=${page}`
  const resp = await fetch(api, {
    method: 'GET',
  })
  if (resp.ok) {
    return resp.json() as Promise<PostDetailData>
  }
  return null
}

export async function postComment(postId: string, body: string) {
  const api = `${HOST}/api/comment`
  const token = localStorage.getItem('access_token')
  const data = {
    postId,
    body,
  }
  if (token !== undefined) {
    const resp = await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (resp.ok) {
      return resp.json()
    } else {
      throw new Error('comment failed')
    }
  } else {
    throw new Error('not logged in')
  }
}

export async function getUserPosts(userId: string): Promise<PostData[]> {
  const offset = 0
  const size = 20
  const api = `${HOST}/api/post/user/${userId}?offset=${offset}&size=${size}`
  const resp = await fetch(api, {
    method: 'GET',
  })
  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error('get user posts failed')
  }
}

export async function postPost(title: string, body: string): Promise<PostData> {
  const api = `${HOST}/api/post`
  const token = localStorage.getItem('access_token')
  const data = {
    title,
    body,
  }
  if (token !== undefined) {
    const resp = await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (resp.ok) {
      return resp.json()
    } else {
      throw new Error('post failed')
    }
  } else {
    throw new Error('not logged in')
  }
}
