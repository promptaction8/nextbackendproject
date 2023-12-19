import mysql from 'mysql2/promise'

export const createConnection = async () => {
    return await mysql.createConnection(
        'mysql://fm1lg707d7cvf9fjpn2i:pscale_pw_FyeCMNrRFsA9Fvz8YLDoFmv43r9cm5LNzAbPw1eEj8W@gcp.connect.psdb.cloud/backendproject_1?ssl={"rejectUnauthorized":true}'
    )
}
