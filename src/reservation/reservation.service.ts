import { Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from '../schemas/reservation.schema';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { GetReservationDto } from './dto/get-reservation-dto';

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation.name) private ReservationModel: Model<Reservation>){}

    CreateReservation(CreateReservationDto: CreateReservationDto){
        return this.ReservationModel.create(CreateReservationDto)
    }

    GetReservations(GetReservationDto: GetReservationDto){
        return this.ReservationModel.find(GetReservationDto)
    }

    GetReservation(id: string){
        return this.ReservationModel.findById(id)
    }

    DeleteReservation(id: string){
        return this.ReservationModel.findByIdAndDelete(id)
    }
}
