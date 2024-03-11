import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import archivePlugin from "src/utils/plugins/archive.plugin";




enum event_category {
    MOVIE="MOVIE",
    SHOW="SHOW",
    FOOTBALLMATCH="MATCH",
    TRIP="TRIP",
    DATE="DATE",
    PICNIC="PICNIC"
}

enum event_mode {ONLINE="ONLINE", INPERSON="IN-PERSON", BOTH="BOTH"}


export type EventDoc = HydratedDocument<Event>

@Schema({timestamps: true, virtuals: true})
export class Event{

    @Prop({required: true})
    Title: string

    @Prop({required: true})
    NumberOfTickets: number

    @Prop({required: true})
    Date: Date

    @Prop({default: false})
    archived: boolean

    @Prop({default: event_category.MOVIE})
    category: event_category

    @Prop({default: event_mode.INPERSON})
    mode: event_mode

    @Prop()
    description: string

    @Prop()
    cove: string
}


export const EventSchema = SchemaFactory.createForClass(Event)

archivePlugin.usePlugin(EventSchema)