import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum adminreview{NONE="NONE", PENDING="PENDING", ACTIVE="ACTIVE"}


@Schema({timestamps: true})
export class Flag{
    @Prop()
    upvote: string[]

    @Prop()
    downvote: string[]

    @Prop()
    complaint: string

    @Prop()
    adminReview: adminreview

}

export const FlagSchema = SchemaFactory.createForClass(Flag)