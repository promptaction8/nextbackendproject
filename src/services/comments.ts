import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { newComments } from '@/dao/comments'
import { getComment } from '@/dao/comments'
import { updateComment } from '@/dao/comments'
import { deleteComment } from '@/dao/comments'

// NEW COMMENTS
export const newCommentsService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const { content, author, password, postIdx } = req.body
    const result: any = await newComments(
        content,
        author,
        password,
        postIdx,
        connection
    )
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: 'ERROR' } })
    }
    res.status(200).json({ status: '댓글이 성공적으로 생성되었습니다' })
}

// UPDATE COMMENTS
export const updateCommentsService = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    const { idx, content, password } = req.body
    const comments: any = await getComment(idx, connection)
    if (password !== comments[0].password) {
        return res.status(400).json({ message: '패스워드가 일치하지 않습니다' })
    }
    const result: any = await updateComment(idx, content, password, connection)
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: '업데이트 안됨' } })
    }
    res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다' })
}

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
    const comment: any = await getComment(idx, connection)
    if (password !== comment[0].password) {
        return res.status(500).json({ message: '패스워드가 일치하지 않습니다' })
    }
    await deleteComment(idx, connection)

    res.status(200).json({ message: '해당 댓글이 삭제되었습니다' })
}
