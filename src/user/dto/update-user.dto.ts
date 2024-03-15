import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { roles } from 'src/schemas/user.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto{
    @ApiPropertyOptional()
    Dob?: string | Date

    @ApiPropertyOptional()
    Avatar?: string

    @ApiPropertyOptional()
    FirstName?: string

    @ApiPropertyOptional()
    LastName?: string

    @ApiPropertyOptional()
    OtherName?: string
}
