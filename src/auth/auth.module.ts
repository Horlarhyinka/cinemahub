import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [AuthService, MailService],
  controllers: [AuthController],
  imports: [UserModule, MongooseModule.forFeature([{name: User.name, schema: UserSchema}])]
})

export class AuthModule {}
