import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule } from "@nestjs/config"
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URI), ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
