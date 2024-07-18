import { Module } from '@nestjs/common';
import { MailModule } from './mail/infraestructure/mail.module';

@Module({
  imports: [MailModule],
})
export class AppModule {}
