import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ReservationService],
  controllers: [ReservationController],
  imports: [MongooseModule.forFeature([{name: Reservation.name, schema: ReservationSchema}])],
})
export class ReservationModule {}
