import mysql from 'mysql2/promise'

export const createConnection = async () => {
    return await mysql.createConnection(
        'mysql://ikowvk7hhy03qili9b1e:pscale_pw_2gt7alBlKmicHJ5T9rJ33c3wNDlrsNZFC710rXJEUbu@gcp.connect.psdb.cloud/databasestudy?ssl={"rejectUnauthorized":true}'
    )
}
