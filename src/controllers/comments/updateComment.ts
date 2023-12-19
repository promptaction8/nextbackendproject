import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { updateCommentsService } from '@/services/comments/updateComment'
import { getComment } from '@/dao/comments'

// UPDATE COMMENTS
export const updateCommentsController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    if (req.query.idx !== req.body.idx) {
        return res
            .status(500)
            .json({ error: 'path파라미터와 body 의 idx가 같지 않습니다' })
    }
    if (req.body.content === undefined || req.body.password === undefined) {
        return res.status(500).json({ error: '값이 정의되지 않았습니다' })
    } else if (req.body.content === '' || req.body.password === '') {
        return res.status(500).json({ error: '빈칸으로 제출할 수 없습니다' })
    }
    await updateCommentsService(req, res, connection)
}
