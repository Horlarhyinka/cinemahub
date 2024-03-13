import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class VerifyUserCallbackDto{
    @ApiProperty()
    @IsNotEmpty()
    code: string
}