import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation-dto';

@Controller('reservation')
export class ReservationController {
    constructor(private ReservatonService: ReservationService){}

    @Post()
    async CreateReservation(@Body() ReservationDto: CreateReservationDto){
        try{
            
        }catch(err){

        }
    }

    @Get()
    async GetReservations(){

    }

    @Get(":id")
    async GetReservation(){

    }

    @Delete(":id")
    async DeleteReservation(){

    }
}