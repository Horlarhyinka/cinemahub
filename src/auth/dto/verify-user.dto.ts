import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class VerifyUserDto{
    @ApiProperty()
    @IsNotEmpty()
    code: string
}