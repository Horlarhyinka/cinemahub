import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie, MovieSchema } from './movies.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [MongooseModule.forFeature([{name: Movie.name, schema: MovieSchema}])]
})
export class MoviesModule {

}
