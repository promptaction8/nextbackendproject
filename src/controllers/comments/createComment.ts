import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { newCommentsService } from '@/services/comments/createComment'

export const newCommentsController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    if (
        req.body.content === undefined ||
        req.body.author === undefined ||
        req.body.password === undefined ||
        req.body.postIdx === undefined
    ) {
        return res.status(500).json({
            error: { message: '값이 들어오지 않았습니다' },
        })
    } else if (
        req.body.content === '' ||
        req.body.author === '' ||
        req.body.password === '' ||
        req.body.postIdx === ''
    ) {
        return res.status(400).json({
            error: { message: '값이 빈칸으로 들어올 수 없습니다' },
        })
    }
    await newCommentsService(req, res, connection)
}
