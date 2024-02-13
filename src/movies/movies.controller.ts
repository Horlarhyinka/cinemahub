import { Body, Controller, Delete, Get, HttpException, HttpStatus, Optional, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie-dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { UpdateMovieDto } from './dto/update-movie-dto';

@Controller('movies')
export class MoviesController {

    constructor(private MoviesService: MoviesService, private ErrorHandler: ErrorHandlerService){}


    //get 
    @Get()
    async GetMovies(@Query("Date") date?: number){
        let ParsedDate: Date;
        if(date){
        try{
            ParsedDate = new Date(date)
        }catch(err){
            throw err
        }
        }
        return ParsedDate? this.MoviesService.GetMovies(ParsedDate): this.MoviesService.GetMovies()
    }

    //post /
    @Post()
    async NewMovie(@Body() CreateMovieDto: CreateMovieDto){
        try{
            const Movie = await this.MoviesService.CreateMovie(CreateMovieDto)
            return Movie
        }catch(err){
            const msg = this.ErrorHandler.HandleMongooseError(err)
            if(msg)throw new HttpException(msg, HttpStatus.BAD_REQUEST)
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    //get /:id
    @Get(":id")
    async GetMovie(@Param("id") movieId: string){
        const movie = await this.MoviesService.GetMovie(movieId)
        if(!movie)return new HttpException("Movie not found", HttpStatus.NOT_FOUND)
        return movie
    }
    //delete
    @Delete(":id")
    async DeleteMovie(@Param("id") movieId: string){
        const deleted = await this.MoviesService.DeleteMovie(movieId)
        return deleted
    }

    //put
    @Put(":id")
    async UpdateMovie(@Param("id") movieId: string, @Body() UpdateMovieDto: UpdateMovieDto){
        try{
        const updated = await this.MoviesService.UpdateMovie(movieId, UpdateMovieDto)
        return updated
        }catch(err){
            const msg = this.ErrorHandler.HandleMongooseError(err)
            if(msg)throw new HttpException(msg, HttpStatus.BAD_REQUEST)
            return new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
