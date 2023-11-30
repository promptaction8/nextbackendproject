import type { NextApiRequest, NextApiResponse } from 'next'
// import { getUserByIdx } from '@/dao/user'
import { createUser } from './../dao/user'
import { findUser } from './../dao/user'

// export const readUserService = (req: NextApiRequest, res: NextApiResponse) => {
//     const user = getUserByIdx(req.query.idx as string)
//     res.status(200).json({ user })
// }
// createUserService
// 새로운 사용자를 생성하는 함수. 새로운 사용자의 아이디, 비밀번호, 이름을 문자열로 받음.
export const createUserService = (id: string, pw: string, name: string) => {
    // createUser함수를 사용하여 새로운 사용자를 생성하고, 그 결과를 newUser 변수에 저장함.
    const newUser = createUser(id, pw, name)
    // 새로 생성된 사용자 객체를 반환함. 서비스 함수를 호출한 곳으로 새로 생성된 사용자 정보를 전달해줌
    return newUser
}

// findUserService
// findUserService 라는 함수는 주어진 id, pw, name 을 매개변수로 이용하여 findUser 함수를 호출하고, 해당하는 사용자를 반환하는 역할을 함.
// 매개변수를 받고, findUser 호출을 함.
export const findUserService = (id: string, pw: string, name: string) => {
    return findUser(id, pw, name)
}
