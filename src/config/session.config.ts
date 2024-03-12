import dotenv from "dotenv"

dotenv.config()

export default {
    dbName: process.env.SESSION_DB_NAME,
    collectionName: process.env.SESSION_COLLECTION_NAME
}