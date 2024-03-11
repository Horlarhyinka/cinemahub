import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";

export type NotificationDoc = HydratedDocument<Notification>


@Schema({timestamps: true})
class Notification{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    userFrom: User

    @Prop({default: []})
    userTo: string[]

    @Prop({default: []})
    readBy: string[]

    @Prop({default: false})
    archived: boolean
}