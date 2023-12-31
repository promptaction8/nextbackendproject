import { createConnection } from '@/utils/mysql'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readPostController } from '@/controllers/posts/readPost'
import { updatePostController } from '@/controllers/posts/updatePost'
import { deletePostController } from '@/controllers/posts/deletePost'

// API HANDLER
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // 데이터베이스 연결 생성
    const connection = await createConnection()

    // 메서드 분기
    if (req.method === 'GET') {
        await readPostController(req, res, connection)
    } else if (req.method === 'PUT') {
        await updatePostController(req, res, connection)
    } else if (req.method === 'DELETE') {
        await deletePostController(req, res, connection)
    } else {
        res.status(400).json({
            error: {
                message: '해당 메서드는 지원하지 않습니다.',
            },
        })
    }
}
