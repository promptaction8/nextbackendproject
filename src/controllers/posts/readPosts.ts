import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { readPostsService } from '@/services/posts/readPosts'

export const readPostsController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const { offset, limit } = req.query

    if (offset === undefined || limit === undefined) {
        return res.status(400).json({
            error: {
                message:
                    '필요한 파라미터가 들어오지 않았습니다.\n필요 파라미터: offset, limit',
            },
        })
    } else if (
        isNaN(parseInt(offset as string)) ||
        isNaN(parseInt(limit as string))
    ) {
        return res.status(400).json({
            error: {
                message:
                    '파라미터의 값이 정상적이지 않습니다.\n필요 파라미터: offset, limit',
            },
        })
    }

    await readPostsService(req, res, connection)
}
