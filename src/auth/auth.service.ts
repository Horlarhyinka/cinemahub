import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { User } from "../schemas/user.schema"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ){}
    async authenticateUser(obj: {email: string, password: string}){
        const existingUser = this.userModel.findOne({email: obj.email})
        
    }
}
