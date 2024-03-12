import * as dotenv from "dotenv"

dotenv.config()

export default {
    dbName: process.env.SESSION_DB_NAME,
    collectionName: process.env.SESSION_COLLECTION_NAME,
    mongoUrl: process.env.DB_URI
}

export interface SessionType{
    token: string
}