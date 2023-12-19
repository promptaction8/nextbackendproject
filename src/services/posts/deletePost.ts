import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { deletePost, getPost } from '@/dao/posts'

export const deletePostService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const idx = parseInt(req.query.idx as string)
    const password = req.query.password
    const post: any = await getPost(idx, connection)
    // 만약 idx의 형변환에 실패하면 NaN 이라는 형태가 담길 것이므로, NaN 인지 검사해서 맞으면 에러처리
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'idx is not available' })
    }
    // ? : 옵셔널 체이닝. post 배열이 비어있지 않고 요소가 존재하면 해당 값을 반환. 아니면 undefined를 반환
    if (password !== post[0]?.password) {
        return res.status(500).json({ message: '패스워드가 일치하지 않습니다' })
    }
    // 쿼리에서 받은 idx와 db의 post 값이 일치하지 않거나(타입이 같아야함) post가 없으면 에러처리.
    if (idx === post[0]?.idx || post.length === 0) {
        return res.status(500).json({ error: ' 삭제할 게시물이 없습니다.' })
    }
    await deletePost(idx, connection)

    res.status(200).json({ message: '해당 게시글이 삭제되었습니다' })
}
