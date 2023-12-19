import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { newPost } from '@/dao/posts'

export const createPostService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    // req.body 내용물을 쓰기 편하게 구조분해할당.
    const { title, content, password, author } = req.body
    // 클라이언트로 나가는 쪽.(응답)
    const result: any = await newPost(
        title,
        content,
        password,
        author,
        connection
    )
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: '안됨.' } })
    }
    res.status(200).json({ status: 'success' })
}
