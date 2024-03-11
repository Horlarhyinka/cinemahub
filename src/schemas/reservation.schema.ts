import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {Movie} from "./movies.schema"

export type ReservationDoc = HydratedDocument<Reservation>

@Schema({timestamps: true, })
export class Reservation {
    @Prop({required: true, default: 1})
    Quantity: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true})
    Movie: Movie
}


export const ReservationSchema = SchemaFactory.createForClass(Reservation)