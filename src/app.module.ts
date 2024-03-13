import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule } from "@nestjs/config"
import { ReservationModule } from './reservation/reservation.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MoviesModule, 
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URI), 
    ReservationModule, 
    ErrorHandlerModule,
    MongooseModule.forRoot(process.env.DB_URL+"movies"),
    MongooseModule.forRoot(process.env.DB_URL+"reservations"),
    MiddlewaresModule,
    UserModule,
    AuthModule,
    MailModule,
    CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService, ErrorHandlerService],
})

export class AppModule {}
