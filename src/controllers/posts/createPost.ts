import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { createPostService } from '@/services/posts/createPost'

export const createPostController = async (
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
        return res.status(500).json({
            error: {
                message:
                    '컨텐츠랑 타이틀, 이름, 패스워드가 들어오지 않았습니다',
            },
        })
    } else if (
        req.body.title === '' ||
        req.body.content === '' ||
        req.body.password === '' ||
        req.body.author === ''
    ) {
        return res.status(404).json({
            error: {
                message:
                    '컨텐츠나 타이틀, 패스워드, 이름을 빈 칸으로 제출할 수 없습니다.',
            },
        })
    }

    await createPostService(req, res, connection)
}
