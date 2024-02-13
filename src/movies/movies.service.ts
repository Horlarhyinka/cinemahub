import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movies.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie-dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private MovieModel: Model<Movie>, private ErrorHandler: ErrorHandlerService){}
    async CreateMovie(CreateMovieDto: CreateMovieDto){
        return this.MovieModel.create({...CreateMovieDto, Date: new Date(CreateMovieDto.Date)})
    }

    async GetMovies(DateFilter?: Date){
        return DateFilter?this.MovieModel.find({Date: {
            $gte: DateFilter
        }}): this.MovieModel.find({})
        
    }

    GetMovie(movieId: string ){
        return this.MovieModel.findById(movieId)
    }

    UpdateMovie(movieId: string, UpdateMovieDto: UpdateMovieDto){
        return this.MovieModel.findByIdAndUpdate(movieId, UpdateMovieDto, {new: true})
    }

    async PopTicket(movieId: string, amount: number){
        const movie = await this.MovieModel.findById(movieId)
        if(!movie)throw Error("movie not found")
        movie.NumberOfTickets -= amount
        await movie.save()
        return movie
    }

    DeleteMovie(movieId: string){
        return this.MovieModel.findByIdAndDelete(movieId)
    }
}
