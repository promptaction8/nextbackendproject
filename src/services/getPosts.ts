import { getPosts } from '@/dao/post'
import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPost } from '@/dao/post'
import { newPost } from '@/dao/post'

export const getPostsService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    // dao 호출
    const posts = await getPosts(connection)

    // 응답
    res.status(200).json({
        posts,
    })
}

export const getPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const idx = parseInt(req.query.idx as string)
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'idx is not available' })
    }
    const post = await getPost(idx, connection)
    if (Array.isArray(post) && post.length === 0) {
        return res.status(404).json({ error: 'post is empty' })
    }
    res.status(200).json({ post })
}

export const newPostService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const { title, content } = req.body
    // 클라이언트로 나가는 쪽.(응답)
    const result = await newPost(title, content, connection)
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: '안됨.' } })
    }
    res.status(200).json({ status: 'success' })
}
