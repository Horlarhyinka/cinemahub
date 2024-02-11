import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MovieDoc = HydratedDocument<Movie>

@Schema({timestamps: true, virtuals: true})
export class Movie{

    @Prop({required: true})
    Title: string

    @Prop({required: true})
    TicketQuantity: number

    @Prop()
    Date: Date

    @Prop()
    Time: string

}


export const CatSchema = SchemaFactory.createForClass(Movie)