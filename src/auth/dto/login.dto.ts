import { ValidationPipe } from "@nestjs/common"
import {IsNotEmpty} from "class-validator"
import {ApiProperty} from "@nestjs/swagger"

export class LoginDto{

    @ApiProperty()
    @IsNotEmpty()
    Email: string

    @ApiProperty()
    @IsNotEmpty()
    Password: string
}