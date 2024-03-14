import { Body, Controller , Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, Req, Session} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDoc } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { generateToken } from 'src/utils/methods/jwt.method';
import { AuthService } from './auth.service';
import { Request } from 'express';
import * as crypto from 'crypto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { VerifyUserDto } from './dto/verify-user.dto';
import { VerifyUserCallbackDto } from './dto/verify-user-callback.dto';
import { generateCode } from "../utils/methods/generateCode.method"
import { ResetPasswordDto } from './dto/reset-password.dto';


@Controller('auth')
export class AuthController {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private authService: AuthService, 
        private mailService: MailService,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ){}

    @Post("login")
    async login(
        @Body() loginDto: LoginDto,
        @Req() req: Request
    ){
        const existingUser: UserDoc = await this.userModel.findOne({Email: loginDto.Email})
        if(!existingUser)return new HttpException('user not found', HttpStatus.NOT_FOUND)
        const passwordIsCorrect = await existingUser.comparePassword(loginDto.Password)
        if(!passwordIsCorrect)return new HttpException("incorrect password", HttpStatus.BAD_REQUEST);
        const token = generateToken(existingUser._id.toString());
        (req.session as undefined as {token: string}).token = token
        return {user: {...existingUser.toObject(), Password: undefined}, token, success: true}
    }

    @Delete("logout")
    async logout(
        @Req() req: Request
    ){
        req.session.destroy((err)=>{ if(err)throw err })
        return {success: true, message: "logout successful"}
    }

    @Post("forget-password")
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
        @Param("resetToken") resetToken: string,
        @Body() resetPasswordDto: ResetPasswordDto
    ){
        const target = await this.authService.findByResetToken(resetToken)
        if(!target)return new HttpException("user not found", HttpStatus.NOT_FOUND)
        target.Password = resetPasswordDto.Password
        target.ResetToken = undefined
        target.TokenExpiresIn = undefined
        await target.save()
        return {success: true, user: {...target.toObject(), Password: undefined}, token: generateToken(target._id.toString())}
    }

    @Post("verify")
    async verifyUser(
        @Body() verifyUserDto: VerifyUserDto
    ){
        const user = await this.userModel.findOne({Email: verifyUserDto.email})
        if(!user)return new HttpException("email not found", HttpStatus.NOT_FOUND)
        const code = generateCode(6)
        this.cacheManager.set(code, user._id.toString(), 1000 * 60 * 2)
        await this.mailService.sendVerificationCodeMail(user.Email, {code})
        return {success: true, message: `verification code sent to ${user.Email}`}
    }

    @Patch("verify/callback")
    async verifyUserCallback(
        @Body() verifyUserCallbackDto: VerifyUserCallbackDto,
        @Req() req: Request
    ){
        const user = await this.userModel.findOne({Email: verifyUserCallbackDto.email})
        if(!user)return new HttpException("email is not registered", HttpStatus.NOT_FOUND)
        const userId = await this.cacheManager.get(verifyUserCallbackDto.code)
        if(!userId || user._id.toString() !== userId.toString())return new HttpException("Invalid email verification code", HttpStatus.BAD_REQUEST)
        user.verified = true
        await user.save()
        await this.mailService.sendOnboardingMail(user.Email)
        const token = generateToken(user._id.toString());
        await this.cacheManager.del(verifyUserCallbackDto.code);
        (req.session as undefined as {token: string}).token = token
        return {user: {...user.toObject(), Password: undefined}, token, success: true}
    }

}

