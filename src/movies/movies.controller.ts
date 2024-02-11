import { Controller, Get, Optional, ParseIntPipe, Query } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose"
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private MoviesService: MoviesService){}


    //get 
    @Get()
    async getMovies(@Query("Date") date?: number){
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
    
    //get /:id
    //post /
    //delete
    //put


}
