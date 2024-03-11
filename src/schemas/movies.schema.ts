import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MovieDoc = HydratedDocument<Movie>

@Schema({timestamps: true, virtuals: true})
export class Movie{

    @Prop({required: true})
    Title: string

    @Prop({required: true})
    NumberOfTickets: number

    @Prop({required: true})
    Date: Date
}


export const MovieSchema = SchemaFactory.createForClass(Movie)