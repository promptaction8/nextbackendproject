// import { readUserController } from '@/controllers/readUser'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUserController } from '@/controllers/readUser'
import { findUserController } from '@/controllers/readUser'

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method === 'GET') {
//         const result = readUserController(req, res)
//         console.log('🚀 ~ result:', result)
//     }
// }

// handler 함수를 내보냄.
// Next.js에서는 API 라우트의 진입점으로 사용되는 함수 이름이 관례적으로 handler로 사용됨.
// 이 함수는 클라이언트로부터 HTTP 요청을 받아 적절한 응답을 반환함.
//createUserHandler

export default async function userHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            createUserController(req, res)
            break
        case 'GET':
            findUserController(req, res)
            break
        default:
            res.status(405).json({ error: 'Method Not Allowed' })
            break
    }
}
