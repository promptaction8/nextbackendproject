import type { Connection } from 'mysql2/promise'
// 전체 post 조회
export const getPosts = async (connection: Connection) => {
    const [rows, fields] = await connection.query('SELECT * FROM post')

    return rows
}

// 특정 post 조회
export const getPost = async (idx: number, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM post WHERE idx=${idx}`
    )
    return rows
}

// Post create
export const newPost = async (
    title: string,
    content: any,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `INSERT INTO post (title, content) VALUES ("${title}", "${content}")`
    )
    return rows
}

// // 프리페어드 스테이트먼트(sql 인젝션 공격 방지..?)
// export const newPost = async (
//     title: string,
//     content: any,
//     connection: Connection
// ) => {
//     const [rows, fields] = await connection.query(
//         'INSERT INTO post (title, content) VALUES (?, ?)',
//         [title, content]
//     )
//     return rows
// }
