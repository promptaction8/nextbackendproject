import { getPostsService } from '@/services/getPosts'
import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostService } from '@/services/getPosts'
import { newPostService } from '@/services/getPosts'

export const getPostsController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    // 요청에 대한 검증
    // query든, body 든 제대로 보냈는지 확인하기.

    // 내 서비스의 유저가 맞는지 인증하기 같은 절차를 거침.

    // 그 다음 서비스 호출.
    await getPostsService(req, res, connection)
}
// controller = 인증과 검증을 하는 곳

export const getPostController = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    await getPostService(req, res, connection)
}

export const newPostController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    // 타이틀이나 컨텐츠가 들어오지 않았을 때
    // query나 body가 제대로 들어왔는지 확인 정도 해줌.
    // 필터 역할.
    //
    if (req.body.title === undefined || req.body.content === undefined) {
        return res.status(404).json({
            error: { message: '컨텐츠랑 타이틀이 들어오지 않았습니다' },
        })
    } else if (req.body.title === '' || req.body.content === '') {
        return res.status(404).json({
            error: {
                message: '컨텐츠나 타이틀을 빈 칸으로 제출할 수 없습니다.',
            },
        })
    }
    await newPostService(req, res, connection)
}
