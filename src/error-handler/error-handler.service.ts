import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
    HandleMongooseError = (err: any) =>{
        if(err.code === 11000){
            return `${Object.keys(err.keyValues)[0]} is taken`
        }
        if(err._message?.includes("validation failed")){
            console.log(err.errors)
            return Object.keys(err.errors).map(error=>err.errors[error]?.properties?.message)
        }
        return null
    }

}
