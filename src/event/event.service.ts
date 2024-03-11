import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie-dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private Event: Model<Event>){}
    async CreateMovie(CreateMovieDto: CreateMovieDto){
        return this.Event.create({...CreateMovieDto, Date: new Date(CreateMovieDto.Date)})
    }

    async GetMovies(DateFilter?: Date){
        return DateFilter?this.Event.find({Date: {
            $gte: DateFilter
        }}): this.Event.find({})
        
    }

    GetMovie(movieId: string ){
        return this.Event.findById(movieId)
    }

    UpdateMovie(movieId: string, UpdateMovieDto: UpdateMovieDto){
        return this.Event.findByIdAndUpdate(movieId, UpdateMovieDto, {new: true})
    }

    async PopTicket(movieId: string, amount: number){
        const movie = await this.Event.findById(movieId)
        if(!movie)throw Error("movie not found")
        movie.NumberOfTickets -= amount
        await movie.save()
        return movie
    }

    DeleteMovie(movieId: string){
        return this.Event.findByIdAndDelete(movieId)
    }
}
