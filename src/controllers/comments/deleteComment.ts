import type { Connection } from 'mysql2/promise'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCommentService } from '@/services/comments/deleteComment'

// DELETE COMMENT
export const deleteCommentController = async (
    req: NextApiRequest,
    res: NextApiResponse,
    connection: Connection
) => {
    await deleteCommentService(req, res, connection)
}
