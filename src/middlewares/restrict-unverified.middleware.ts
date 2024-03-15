import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class RestrictUnverifiedAccount implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("restrict-unverified")
        if(!req.user?.verified)return res.status(403).json({message: "email address is not verified", error: "account unverified", success: false})
        next()
    }
}