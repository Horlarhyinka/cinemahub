import { Request } from "express";
import { UserDoc } from "src/schemas/user.schema";


export interface ExtReq extends Request{
    user: UserDoc
}