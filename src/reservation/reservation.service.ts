import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './reservation.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation.name) private ReservationModel: Model<Reservation>){}

    @Post()
    CreateReservation(){

    }

    @Get()
    GetReservations(){

    }

    @Get(":id")
    GetReservation(){

    }

    @Put(":id")
    UpdateReservation(){

    }

    @Delete(":id")
    DeleteReservation(){
        
    }
}
