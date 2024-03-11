import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";
import archivePlugin from "src/utils/plugins/archive.plugin";

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

const NotificationSchema = SchemaFactory.createForClass(Notification)

archivePlugin.usePlugin(NotificationSchema)