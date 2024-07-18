import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from 'src/mail/application/services/mail.service';
import { EmailDTO } from 'src/mail/domain/dto/email.dto';
import { MAIL_QUEUE } from 'src/shared/constants/MAIL_QUEUE';

@Controller()
export class MailController {
  constructor(
    @Inject(MailService) private readonly _mailService: MailService,
  ) {}

  @MessagePattern({ cmd: MAIL_QUEUE.sendEmail })
  sendMessage(@Payload() emailReq: EmailDTO) {
    return this._mailService.sendEmail(emailReq);
  }
}
