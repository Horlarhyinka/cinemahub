import dotenv from "dotenv"

dotenv?.config()

export default {
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE
}

export const sender_mail_address = process.env.MAIL_ADDRESS