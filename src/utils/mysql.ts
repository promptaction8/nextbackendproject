import mysql from 'mysql2/promise'

export const createConnection = async () => {
    return await mysql.createConnection(
        'mysql://txc0crh2uvoiirkmos6c:pscale_pw_pd3vaNmT5Fw2UeBHGpI9vC1UMqVIJkEHe8OZW3smiNy@gcp.connect.psdb.cloud/backendproject_1?ssl={"rejectUnauthorized":true}'
    )
}
