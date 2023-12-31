import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { updatePostService } from '@/services/posts/updatePost'

export const updatePostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    if (
        req.body.title === undefined ||
        req.body.content === undefined ||
        req.body.password === undefined ||
        req.body.author === undefined
    ) {
        return res.status(500).json({ error: '값이 정의되지 않았습니다' })
    } else if (
        req.body.title === '' ||
        req.body.content === '' ||
        req.body.password === '' ||
        req.body.author === ''
    ) {
        return res.status(500).json({ error: '빈칸으로 제출할 수 없습니다' })
    }
    await updatePostService(req, res, connection)
}
