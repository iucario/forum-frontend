export type UserData = {
  id: number
  name: string
  createdAt: number
  postCount: number
  commentCount: number
  fileCount: number
}

export type PostData = {
  id: number
  title: string
  body: string
  createdAt: number
  updatedAt: number
  activeAt: number
  author: UserData
  commentCount: number
}

export type CommentData = {
  id: number
  body: string
  createdAt: number
  updatedAt: number
  author: UserData
}

export interface PostDetailData extends PostData {
  comments: CommentData[]
}

const example = {
  id: 3,
  title: 'Other',
  body: 'post by otheruser',
  createdAt: 1668935832356,
  updatedAt: 1668935832356,
  activeAt: 1668937300157,
  author: {
    id: 2,
    name: 'otheruser',
    createdAt: 1668935830079,
    postCount: 1,
    commentCount: 0,
    fileCount: 0,
  },
  commentCount: 7,
}
