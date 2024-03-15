import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { roles } from "src/schemas/user.schema";

@Injectable()
export class AllowAdmin implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("allow-admin")
        if(req.user?.role !== roles.ADMIN || req.user?.role !== roles.SUPERADMIN){
            return  res.status(403).json({message: "you do not have permission to access this resource", error: "unauthorized", success: false})
        }
        next()
    }
}

export class AllowSuperAdmin implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("allow-superadmin")
        if(req.user?.role !== roles.SUPERADMIN){
            return res.status(401).json({error: "unauthorized", success: false, message: "you do not have permission to access this resource"})
        }
        next()
    }
}