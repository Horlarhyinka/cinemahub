import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import * as bcrypt from "bcrypt"
import archivePlugin from "../utils/plugins/archive.plugin"
import { Flag } from "./flag.schema";

export enum roles{BASIC="BASIC", ADMIN="ADMIN", SUPERADMIN="SUPERADMIN"}

export type UserDoc = HydratedDocument<User>

@Schema({timestamps: true})
export class User{
    @Prop({required: true, unique: true})
    Email: string

    @Prop({default: roles.BASIC})
    Role: roles

    @Prop({required: true, minlength: 6})
    Password: string

    @Prop({default: false})
    archived: boolean

    @Prop()
    Avatar: string

    @Prop()
    Username: string

    @Prop()
    FirstName: string

    @Prop()
    LastName: string

    @Prop()
    OtherName: string

    @Prop()
    Dob: Date

    @Prop({default: false})
    disabled: boolean

    @Prop({default: false})
    verified: boolean

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: Flag.name})
    Flags: Flag[]

    @Prop()
    ResetToken: string

    @Prop()
    TokenExpiresIn: number

    comparePassword: (text: string)=>Promise<boolean>



}

export const UserSchema = SchemaFactory.createForClass(User)

archivePlugin.usePlugin(UserSchema)

UserSchema.methods.comparePassword = function(text: string){
    return bcrypt?.compare(text, this.Password)
}

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(12)
    const hashed = await bcrypt.hash(this.Password, salt)
    this.Password = hashed
})

export const UserModel = mongoose.model(User.name, UserSchema)
