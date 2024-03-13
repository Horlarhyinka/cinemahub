import { Body, Controller , Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Req, Session} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { generateToken } from 'src/utils/methods/jwt.method';
import { AuthService } from './auth.service';
import { Request } from 'express';
import crypto from 'crypto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Controller('auth')
export class AuthController {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private authService: AuthService, 
        private mailService: MailService,
        @Inject(CACHE_MANAGER) cacheManager: Cache
    ){}

    @Post("login")
    async login(
        @Body() loginDto: LoginDto,
        @Req() req: Request
    ){
        const existingUser: UserDoc = await this.userModel.findOne({email: loginDto.email})
        if(!existingUser)return new HttpException('user not found', HttpStatus.NOT_FOUND)
        const passwordIsCorrect = await existingUser.comparePassword(loginDto.password)
        if(!passwordIsCorrect)return new HttpException("incorrect password", HttpStatus.BAD_REQUEST);
        const token = generateToken(existingUser._id.toString());
        (req.session as undefined as {token: string}).token = token
        return {user: {...existingUser.toObject(), Password: undefined}, token, success: true}
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
        await this.mailService.sendResetTokenMail(target.Email, {resetToken})
        return {success: true, message: `check ${target.Email} to complete password reset`}
    }   

    @Patch("forget-password/:resetToken")
    async resetPassword(
        @Param("resetToken") resetToken: string
    ){
        const target = await this.authService.findByResetToken(resetToken)
        if(!target)return new HttpException("user not found", HttpStatus.NOT_FOUND)
        return {success: true, user: {...target.toObject(), Password: undefined}, token: generateToken(target._id.toString())}
    }

    @Get("verify")
    async verifyUser(){
        
    }

    @Patch("verify/callback")
    async verifyUserCallback(){

    }
}

