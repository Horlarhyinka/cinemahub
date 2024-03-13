import { Injectable } from '@nestjs/common';
import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import mailConfig, { sender_mail_address } from 'src/config/mail.config';
import pug from "pug"
import path from 'path';

@Injectable()
export class MailService {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
    constructor(){
        const transporter = nodemailer?.createTransport(mailConfig)
        this.transporter = transporter
    }

    loadTemplate(path: string, data: object = {}){
        return pug.render(path, data)
    }

    sendMail(target: string, path: string, data: object){
        return this.transporter.sendMail({
            to: target,
            from: sender_mail_address,
            html: this.loadTemplate(path, data)
        })
    }

    sendResetTokenMail(email: string, data: {resetToken: string}){
        return this.sendMail(email, path.resolve(__dirname, "../templates/reset-token.pug"), data)
    }

    sendVerificationCodeMail(email: string, data: {code: string}){
        return this.sendMail(email, path.resolve(__dirname, "../templates/verification-code.pug"), data)
    }

    sendOnboardingMail(email: string){
        return this.sendMail(email, path.resolve(__dirname, "../templates/onboarding.pug"), {})
    }
}
