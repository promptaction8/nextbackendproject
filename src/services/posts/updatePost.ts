import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection } from 'mysql2/promise'
import { getPost, updatePost } from '@/dao/posts'

export const updatePostService = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
    connection: Connection
) => {
    const { idx, title, content, password, author } = req.body
    const post: any = await getPost(idx, connection)
    if (password !== post[0].password) {
        return res.status(500).json({ message: '패스워드가 일치하지 않습니다' })
    }

    const result: any = await updatePost(
        idx,
        title,
        content,
        author,
        password,
        connection
    )
    if (result.affectedRows !== 1) {
        return res.status(400).json({ error: { message: '안됨.' } })
    }

    res.status(200).json({ message: '게시물이 성공적으로 업데이트되었습니다.' })
}
