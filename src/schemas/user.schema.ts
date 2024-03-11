import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt"

export enum roles{BASIC="BASIC", ADMIN="ADMIN"}

export type UserDoc = HydratedDocument<User>

@Schema()
class User{
    @Prop({required: true, unique: true})
    email: string

    @Prop({default: roles.BASIC})
    role: roles

    @Prop({required: true, minlength: 6})
    password: string

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.methods.comparePassword = function(text: string){
    return bcrypt.compare(text, this.password)
}

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(this.password, salt)
    this.password = hashed
})