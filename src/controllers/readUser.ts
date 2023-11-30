// import { readUserService } from '@/services/readUser'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUserService } from '@/services/readUser'
import { findUserService } from '@/services/readUser'
import { createUser } from './../dao/user'
import { error } from 'console'

// export const readUserController = (
//     req: NextApiRequest,
//     res: NextApiResponse
// ) => {
//     readUserService(req, res)
// }

// createUserController
// import로 /service/readUser 에서 createUserService 함수를 가져옴
// createUserController를 export로 내보내줌.
// 이 함수는 Next.js의 API 라우트에서 사용될 것임. HTTP 요청(req)과 응답(res) 객체를 매개변수로 받음.
export const createUserController = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // HTTP 요청의 메소드가 POST 인지 확인함. POST 일 경우에만 조건문을 실행함.
    if (req.method === 'POST') {
        // req.body에서 id, pw, name 을 추출함. 클라이언트에서 전송된 HTTP POST 요청의 본문에서 이 데이터를 가져옴.
        const { id, pw, name } = req.body
        // createUserService 서비스 함수를 호출해서 새로운 사용자를 생성하고 그 결과를 newUser변수에 저장함.
        const newUser = createUserService(id, pw, name)
        // 새로 생성된 사용자 정보를 JSON 형식으로 응답함.
        // HTTP 상태 코드는 '201 created'로 설정됨.
        // 클라이언트는 새로운 자원이 성공적으로 생성됬다는 것을 나타내는 이 코드를 받게됨.
        res.status(201).json({ user: newUser })
        // POST 이외에 다른 HTTP 메소드로 요청이 오면 '405 Method Not Allowed' 상태 코드로 응답함.
        // 이 엔드포인트가 POST 요청만 허용하고 다른 메소드는 허용하지 않음을 나타냄.
    } else {
        res.status(405).json({ error: 'Method Not Allowed' })
    }
}

//findUserController

export const findUserController = (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id, pw, name } = req.query

    if (!id || !pw || !name) {
        return res
            .status(400)
            .json({ error: 'Invalid input. Please provide id, pw, and name.' })
    }

    const foundUsers = findUserService(
        id as string,
        pw as string,
        name as string
    )

    if (foundUsers.length > 0) {
        res.status(200).json({ users: foundUsers })
    } else {
        res.status(404).json({ error: 'User not found.' })
    }
}
