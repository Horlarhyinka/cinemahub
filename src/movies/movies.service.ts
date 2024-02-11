import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movies.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie-dto';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private MovieModel: Model<Movie>){}
    async CreateMovie(CreateMovieDto: CreateMovieDto){
        try{
        const NewMovie = await this.MovieModel.create({...CreateMovieDto, Date: new Date(CreateMovieDto.Date)})
        return NewMovie
        }catch(err){
            throw err
        }
    }

    async GetMovies(DateFilter?: Date){
        const filtered = await this.MovieModel.find({Date: {
            $gte: DateFilter
        }})
        return filtered
        
    }

    async GetMovie(movieId: string ){
        const movie = await this.MovieModel.findById(movieId)
        if(!movie)throw Error("Movie not found")
        return movie
    }

    async UpdateMovie(movieId: string, UpdateMovieDto: UpdateMovieDto){
        try{

        const updated = await this.MovieModel.findByIdAndUpdate(movieId, UpdateMovieDto, {new: true})
            return updated

        }catch(err){
            throw err
        }
    }

    async PopTicket(movieId: string, amount: number){
        const movie = await this.MovieModel.findById(movieId)
        if(!movie)throw Error("movie not found")
        movie.NumberOfTickets -= amount
        await movie.save()
        return movie
    }
}
