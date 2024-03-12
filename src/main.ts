import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Session from "express-session"
import mongoStore from "connect-mongo"
import serverConfig from './config/server.config';
import sessionConfig from './config/session.config';
import * as cors from "cors"
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(Session({
    secret: serverConfig.secret,
    store: mongoStore?.create(sessionConfig),
    resave: true,
    saveUninitialized: false
  }))

  app.use(cors({
    origin: serverConfig.whitelists?.split(",")
  }))

  app.use(helmet())

  await app.listen(3000);
}
bootstrap();
