import { Module } from '@nestjs/common';
import { MailController } from './controllers/mail.controller';
import { MailService } from '../application/services/mail.service';
import { NodeMailerImp } from './ports/nodemailer.port';

@Module({
  controllers: [MailController],
  providers: [MailService, NodeMailerImp],
})
export class MailModule {}
