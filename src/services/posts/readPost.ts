import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { getCommentsByPostIdx, getPost } from '@/dao/posts'

export const readPostService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    // Query Parameter는 string으로만 받을 수 있음.
    // 하지만 idx는 숫자 타입이므로, 형변환을 진행.
    const idx = parseInt(req.query.idx as string)
    // 만약 idx의 형변환에 실패하면 NaN 이라는 형태가 담길 것이므로, NaN 인지 검사해서 맞으면 에러처리
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'idx 타입이 number가 아닙니다' })
    }
    // getPost 함수를 통해 post를 조회하고, 이를 반환받은 값을 post라고 정의.
    const post = await getPost(idx, connection)
    // post가 배열인데 length가 0이면, 조회된 결과가 없으므로 에러처리
    if (Array.isArray(post) && post.length === 0) {
        return res.status(404).json({ error: '게시글이 없습니다' })
    }
    // 댓글 조회.
    const comments = await getCommentsByPostIdx(idx, connection)
    // 응답
    res.status(200).json({ post, comments })
}
