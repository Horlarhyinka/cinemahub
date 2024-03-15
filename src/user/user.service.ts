import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, roles } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ){}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto)
  }

  findAll() {
    return this.userModel.find().select("-Password");
  }

  findOne(id: string) {
    return this.userModel.findById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }

  disableUser(id: string){
    return this.userModel.findByIdAndUpdate(id, {disabled: true}, {new: true})
  }

  enableUser(id: string){
    return this.userModel.findByIdAndUpdate(id, {disabled: false}, {new: true})
  }

  updateUserRole(id: string, role: roles){
    return this.userModel.findByIdAndUpdate(id, {role}, {new: true})
  }

  queryUser(query: object){
    return this.userModel.findOne(query)
  }


}
