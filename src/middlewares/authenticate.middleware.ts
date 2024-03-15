import { HttpCode, HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserModel, UserSchema } from "src/schemas/user.schema";
import { verifyToken } from "src/utils/methods/jwt.method";

@Injectable()
export class Authenticate implements NestMiddleware{
    
    async use(req: any, res: any, next: (error?: any) => void) {
        console.log("restrict-unverified")
        const token = req.session.token || req.headers["Authorization"]?.split(" ")[1]
        if(!token)return  res.status(401).json({message: "user is unauthenticated", error: "unauthenticated", success: false})
        const payload = verifyToken(token)
        const user = await UserModel.findById(payload.id)
        if(!user)return  res.status(401).json({message: "user is unauthenticated", error: "unauthenticated", success: false})
        req.user = user
        next()
    }

}