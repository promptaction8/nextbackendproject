import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { newComments } from '@/dao/comments'
import { getComment } from '@/dao/comments'
import { updateComment } from '@/dao/comments'
import { deleteComment } from '@/dao/comments'

// DELETE COMMENTS
export const deleteCommentService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const idx = parseInt(req.query.idx as string)
    // 만약 idx의 형변환에 실패하면 NaN 이라는 형태가 담길 것이므로, NaN 인지 검사해서 맞으면 에러처리
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'idx is not available' })
    }

    const password = req.query.password
    const noComment = req.query
    const comment: any = await getComment(idx, connection)
    // comment[0]?.password 는 배열이 비어있는 경우에 undefined를 반환. 그렇지 않은 경우에 comment[0]의 password 속성에 접근함. comment가 비어있는 경우에도 코드 실행.
    if (password !== comment[0]?.password) {
        return res.status(500).json({ message: '패스워드가 일치하지 않습니다' })
    }
    if (noComment.idx === comment || comment.length === 0) {
        return res.status(500).json({ message: '삭제할 댓글이 없습니다' })
    }
    await deleteComment(idx, connection)

    res.status(200).json({ message: '해당 댓글이 삭제되었습니다' })
}
