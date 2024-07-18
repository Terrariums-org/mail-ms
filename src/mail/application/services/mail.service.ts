import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EmailDTO } from 'src/mail/domain/dto/email.dto';
import { EmailRepositoryI } from 'src/mail/domain/repository/emailRepository';
import { NodeMailerImp } from 'src/mail/infraestructure/ports/nodemailer.port';

@Injectable()
export class MailService {
  constructor(
    @Inject(NodeMailerImp) private readonly _emailRepository: EmailRepositoryI,
  ) {}

  async sendEmail(emailReq: EmailDTO) {
    try {
      await this._emailRepository.sendMail(emailReq);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
