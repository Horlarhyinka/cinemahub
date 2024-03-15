import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { roles } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const existing = await this.userService.queryUser({ Email: createUserDto.Email})
    if(existing)return new HttpException("email is already registered.", HttpStatus.BAD_REQUEST)

    let deleted = await this.userService.queryUser({Email: createUserDto.Email, archived: true})
    if(deleted){
      deleted.archived = false
      deleted = await deleted.save()
      return {success: true, user: {...deleted.toObject(), Password: undefined}}
    }

    const user = await this.userService.create(createUserDto);
    return {success: true, user: {...user.toObject(), Password: undefined}}
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.Dob && (updateUserDto ={...updateUserDto,Dob: new Date(updateUserDto.Dob)})
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/disable')
  async disableUser(
    @Param("id") userId: string,
  ){
    const user = await this.userService.disableUser(userId)
    return {success: true, user: {...user.toObject(), Password: undefined}}
  }

  @Patch(':id/enable')
  async enableUser(
    @Param("id") userId: string,
  ){
    const user = await this.userService.enableUser(userId)
    return {success: true, user: {...user.toObject(), Password: undefined}}
  }

  @Patch(':id/update-role')
  async updateRole(
    @Param("id") userId: string,
    @Body() updateROleDto: UpdateUserRole
  ){
    const role = roles[updateROleDto.role]
    if(!role){
      const message = `Invalid role, role can only be ${Object.values(roles).join(", ")}`
      return new HttpException(message, HttpStatus.BAD_REQUEST)
    }
    const user = await this.userService.updateUserRole(userId, role)
    return {success: true, user: {...user.toObject(), Password: undefined}}
  }
}
