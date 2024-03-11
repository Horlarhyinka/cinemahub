import { Module } from '@nestjs/common';
import { MoviesController } from './event.controller';
import { EventService } from './event.service';
import { Event, EventSchema } from '../schemas/event.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MoviesController],
  providers: [EventService],
  imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])]
})
export class MoviesModule {

}
