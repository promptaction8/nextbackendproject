const userDataBase = [
    {
        idx: 3,
        id: 'promptaction',
        pw: 'password12334',
        name: 'My Name',
    },
]
// export const getUserByIdx = (idx: string) =>
//     userDataBase.find((userInDB) => userInDB.idx === Number(idx))

// export const getUser = (id: string, pw: string) =>
//     userDataBase.find((userInDB) => userInDB.id === id && userInDB.pw === pw)

// createUser
// 새로운 유저를 만드는 함수를 생성하고 각 속성들에게 타입을 지정해줌
export const createUser = (name: string, id: string, pw: string) => {
    const newUser = {
        idx: userDataBase.length + 1,
        id,
        pw,
        name,
    }
    userDataBase.push(newUser)
    return newUser
}

// findUser
// && : AND, || : OR
// id, pw, name 이 모두 일치해야 찾을 수 있음.
export const findUser = (id: string, pw: string, name: string) => {
    return userDataBase.filter(
        (user) => user.id === id && user.pw === pw && user.name === name
    )
}
