import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {Event} from "./event.schema"
import archivePlugin from "src/utils/plugins/archive.plugin";

export type ReservationDoc = HydratedDocument<Reservation>

@Schema({timestamps: true, })
export class Reservation {
    @Prop({required: true, default: 1})
    Quantity: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Event.name, required: true})
    Movie: Event

    @Prop({default: false})
    archived: boolean
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation)

archivePlugin.usePlugin(ReservationSchema)