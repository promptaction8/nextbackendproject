import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { newComments } from '@/dao/comments'
import { getComment } from '@/dao/comments'
import { updateComment } from '@/dao/comments'
import { deleteComment } from '@/dao/comments'
// UPDATE COMMENTS
export const updateCommentsService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const idx = parseInt(req.body.idx)
    const { content, password } = req.body
    const comments: any = await getComment(idx, connection)
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'idx is not available' })
    }
    if (password !== comments[0].password) {
        return res.status(400).json({ message: '패스워드가 일치하지 않습니다' })
    }
    const result: any = await updateComment(idx, content, password, connection)
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: '업데이트 안됨' } })
    }
    if (idx === comments || comments.length === 0) {
        return res.status(500).json({ message: ' 수정할 게시물이 없습니다' })
    }
    res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다' })
}
