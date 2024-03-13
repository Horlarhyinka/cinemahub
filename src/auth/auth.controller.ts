import { Body, Controller , Delete, Get, HttpException, HttpStatus, Patch, Post, Req} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { generateToken } from 'src/utils/methods/jwt.method';
import { AuthService } from './auth.service';
import { Request } from 'express';
import crypto from 'crypto';
import { ForgetPasswordDto } from './dto/forget-password.dto';


@Controller('auth')
export class AuthController {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private authService: AuthService
    ){}

    @Post("login")
    async login(
        @Body() loginDto: LoginDto
    ){
        const existingUser: UserDoc = await this.userModel.findOne({email: loginDto.email})
        if(!existingUser)return new HttpException('user not found', HttpStatus.NOT_FOUND)
        const passwordIsCorrect = await existingUser.comparePassword(loginDto.password)
        if(!passwordIsCorrect)return new HttpException("incorrect password", HttpStatus.BAD_REQUEST)
        return {user: {...existingUser.toObject(), password: undefined}, token: generateToken(existingUser._id.toString()), success: true}
    }

    @Delete("logout")
    async logout(
        @Req() req: Request
    ){
        req.session.destroy((err)=>{ throw err })
        return {success: true, message: "logout successful"}
    }

    @Get("forget-password")
    async forgetPassword(
        @Body() forgetPasswordDto: ForgetPasswordDto
    ){
        const resetToken = crypto.randomBytes(8).toString("hex")
        const target = await this.userModel.findOneAndUpdate(forgetPasswordDto, {ResetToken: resetToken, TokenExpiresIn: Date.now() + 1000 * 60 * 60 * 2})
        if(!target)return new HttpException("user not found", HttpStatus.NOT_FOUND)
    }   

    @Patch("")
    async resetPassword(){

    }
}
