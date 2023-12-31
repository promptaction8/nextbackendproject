import type { Connection } from 'mysql2/promise'

// CREATE COMMENTS
export const newComments = async (
    content: string,
    author: string,
    password: string,
    postIdx: number,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `INSERT INTO comment (content, author, password, postIdx) VALUES ("${content}", "${author}", "${password}", "${postIdx}")`
    )
    return rows
}

// UPDATE COMMENTS
// UPDATE [테이블] SET [열] = '변경할값' WHERE [조건]
export const updateComment = async (
    idx: number,
    content: string,
    password: string,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `UPDATE comment SET content = "${content}", password = "${password}" WHERE idx = "${idx}"`
    )
    return rows
}

// 특정 COMMENTS 조회
export const getComment = async (idx: number, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM comment WHERE idx = ${idx}`
    )
    return rows
}

// DELETE COMMENTS
export const deleteComment = async (idx: number, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `DELETE FROM comment WHERE idx = ${idx}`
    )
    return rows
}
