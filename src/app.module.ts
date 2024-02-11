import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule } from "@nestjs/config"
import { ReservationModule } from './reservation/reservation.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DB_URI), ReservationModule, ErrorHandlerModule],
  controllers: [AppController],
  providers: [AppService, ErrorHandlerService],
})

export class AppModule {}
