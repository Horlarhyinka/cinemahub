import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
    HandleMongooseError = (err: any) =>{
        if(err.code === 11000){
            return `${Object.keys(err.keyValues)[0]} is taken`
        }
        if(err._message?.includes("validation failed")){
            return Object.keys(err.errors).map(error=>{
                const msg = err.errors[error]?.properties?.message
                return msg? msg: `Invalid ${error}`
            }).join("\n")
        }
        return null
    }

}
