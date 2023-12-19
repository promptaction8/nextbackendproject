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
    const postIdx = parseInt(req.body.postIdx)
    const { content, author, password } = req.body
    const result: any = await newComments(
        content,
        author,
        password,
        postIdx,
        connection
    )
    if (isNaN(postIdx)) {
        return res.status(500).json({ error: 'postIdx 값이 number가 아닙니다' })
    }
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: 'ERROR' } })
    }
    res.status(200).json({ status: '댓글이 성공적으로 생성되었습니다' })
}
