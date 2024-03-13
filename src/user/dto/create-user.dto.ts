import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    Email: string

    @ApiProperty()
    @IsNotEmpty()
    Password: string
}
