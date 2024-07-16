import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const jwt_secret = process.env.SECRET_TOKEN

export const createToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
     expiresIn: '1h'
    })
}
