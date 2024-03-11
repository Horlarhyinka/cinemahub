import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import archivePlugin from "src/utils/plugins/archive.plugin";


export type MovieDoc = HydratedDocument<Movie>

@Schema({timestamps: true, virtuals: true})
export class Movie{

    @Prop({required: true})
    Title: string

    @Prop({required: true})
    NumberOfTickets: number

    @Prop({required: true})
    Date: Date

    @Prop({default: false})
    archived: boolean

}


export const MovieSchema = SchemaFactory.createForClass(Movie)

archivePlugin.usePlugin(MovieSchema)