import { getPostController, getPostsController } from '@/controllers/getPosts'
import { createConnection } from '@/utils/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // database connection 생성
    const connection = await createConnection()
    // METHOD 분기
    if (req.method === 'GET') {
        // controller 호출
        await getPostsController(req, res, connection)
    } else {
        res.status(400).json({
            error: {
                message: '해당 메서드는 지원하지 않습니다.',
            },
        })
    }
}
