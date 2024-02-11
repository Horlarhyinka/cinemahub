import { Body, Controller, Delete, Get, HttpException, HttpStatus, Optional, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie-dto';

@Controller('movies')
export class MoviesController {

    constructor(private MoviesService: MoviesService){}


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
            return this.MoviesService.CreateMovie(CreateMovieDto)
        }catch(err){
            console.log({err})
            return new HttpException(err, HttpStatus.BAD_REQUEST)
        }
    }
    
    //get /:id
    @Get(":id")
    async GetMovie(@Param("id") movieId: string){
        return this.MoviesService.GetMovie(movieId)
    }
    //delete
    @Delete(":id")
    async DeleteMovie(@Param("id") movieId: string){
        return this.MoviesService.DeleteMovie(movieId)
    }

}
