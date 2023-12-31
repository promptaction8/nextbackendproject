import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { getPosts } from '@/dao/posts'

export const readPostsService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    // 정의
    const { offset, limit } = req.query

    // dao 호출
    const posts = await getPosts({
        offset: parseInt(offset as string),
        limit: parseInt(limit as string),
        connection,
    })

    // 응답
    res.status(200).json({
        posts,
    })
}
