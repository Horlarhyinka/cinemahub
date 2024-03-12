import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.SERVER_PORT || 3000,
    secret: process.env.SERVER_SECRET,
    whitelists: process.env.SERVER_WHITELIST_ENDPOINTS
}