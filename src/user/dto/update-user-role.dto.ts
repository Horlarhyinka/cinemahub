import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { roles } from "src/schemas/user.schema";

export class UpdateUserRole{
    @ApiProperty()
    @IsNotEmpty()
    role: roles
}