import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {Movie} from "../movies/movies.schema"


@Schema({timestamps: true, })
export class Reservation {
    @Prop({required: true})
    Name: string

    @Prop({required: true, default: 1})
    Quantity: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Movie"})
    Movie: Movie
}