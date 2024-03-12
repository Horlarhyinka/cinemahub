import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDoc } from "../schemas/user.schema"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}
    async authenticateUser(obj: {email: string, password: string}){
        const existingUser: UserDoc = await this.userModel.findOne({email: obj.email})
        if(!existingUser)return new HttpException('user not found', HttpStatus.NOT_FOUND)
        const passwordIsCorrect = await existingUser.comparePassword(obj.password)
        if(!passwordIsCorrect)return new HttpException("incorrect password", HttpStatus.BAD_REQUEST)
        
    }
}
