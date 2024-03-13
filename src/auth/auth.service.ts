import { HttpCode, HttpException, HttpStatus, Injectable, Req, Session } from '@nestjs/common';
import { User, UserDoc } from "../schemas/user.schema"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionType } from 'src/config/session.config';
import { Request } from "express"

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}
    async logoutUser(
        @Req() req: Request
    ){
        try{
        req.session.destroy((err)=>{throw err})
        return true
        }catch(ex){
            return false
        }
    }

    async updatePassword(userId: string, newPassword: string){
        return this.userModel.findByIdAndUpdate(userId, {Password: newPassword}, {new: true})
    }

    async findByResetToken(ResetToken: string){
        return this.userModel.findOne({ResetToken, TokenExpiresIn: {
            $gte: Date.now()
        }})
    }

    
}
