import type { Connection } from 'mysql2/promise'

// 전체 POST 조회
// 게시글 전체조회 시 부하를 막기 위해 idx, title만 조회되게 query문 변경.
// offset과 cursor를 활용한 pagination 적용(미구현)
// title이나 작성자를 활용한 검색기능도 추가(미구현)
interface IGetPosts {
    offset: number | null
    limit: number | null
    connection: Connection
}
export const getPosts = async ({
    offset = null,
    limit = null,
    connection,
}: IGetPosts) => {
    let query = 'SELECT idx, title FROM post ORDER BY createdAt DESC'

    if (limit !== null) {
        query += ` LIMIT ${limit}`
    }
    if (offset !== null) {
        query += ` OFFSET ${offset}`
    }

    const [rows, fields] = await connection.query(query)

    return rows
}

// 특정 POST 조회
// idx 기반으로 조회.
// 전체 조회에서 빠졌던 content도 같이 조회
// 이 게시글에 달린 댓글들도 함께 조회되어야 함.
export const getPost = async (idx: number, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM post WHERE idx = ${idx};`
    )
    return rows
}
// 특정 POST의 idx 기반으로 COMMENTS 조회
export const getCommentsByPostIdx = async (
    postIdx: number,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM comment WHERE postIdx = ${postIdx}`
    )
    return rows
}

// CREATE POST
// title, content, password, author 데이터 기반으로 게시글 추가.
export const newPost = async (
    title: string,
    content: any,
    password: string,
    author: string,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `INSERT INTO post (title, content, password, author) VALUES ("${title}", "${content}", "${password}", "${author}")`
    )
    return rows
}

// UPDATE POST
// UPDATE [테이블] SET [열] = '변경할값' WHERE [조건]
export const updatePost = async (
    idx: number, // 수정하고자 하는 게시물의 식별자
    title: string,
    content: any,
    author: string,
    password: string,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `UPDATE post SET title = "${title}", content = "${content}", author = "${author}", password = "${password}" WHERE idx = ${idx}`
    )
    return rows
}

// DELETE POST
export const deletePost = async (idx: number, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `DELETE FROM post WHERE idx = ${idx}`
    )
    return rows
}
