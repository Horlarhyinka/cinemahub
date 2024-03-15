import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule } from "@nestjs/config"
import { ReservationModule } from './reservation/reservation.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RestrictUnverifiedAccount } from './middlewares/restrict-unverified.middleware';
import { Authenticate } from './middlewares/authenticate.middleware';
import { AllowAdmin, AllowSuperAdmin } from './middlewares/authorize.middleware';

enum paths{
  user="user",
  auth="auth",
  event="movie",
  all="*"
}

@Module({
  imports: [
    MoviesModule, 
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URI), 
    ReservationModule, 
    ErrorHandlerModule,
    UserModule,
    AuthModule,
    MailModule,
    CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService, ErrorHandlerService],
})

export class AppModule implements NestModule{

    

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RestrictUnverifiedAccount, Authenticate)
    .exclude({path: "auth", method: RequestMethod.ALL})
    .exclude(
      {path: paths.user, method: RequestMethod.POST}, 
      {path: "auth/(.*)", method: RequestMethod.ALL},

      )
    .forRoutes({path: paths.all, method: RequestMethod.ALL})

    consumer.apply(AllowSuperAdmin)
    .forRoutes({path: paths.user, method: RequestMethod.DELETE})
  }
}
