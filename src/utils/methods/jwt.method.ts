import * as jwt from "jsonwebtoken"
import serverConfig from "src/config/server.config"

export const generateToken = (id: string)=>{
    return jwt.sign({id}, serverConfig.secret, {expiresIn: "2d"})
}

export const verifyToken = (token: string)=>{
    return jwt.verify(token, serverConfig.secret)
}