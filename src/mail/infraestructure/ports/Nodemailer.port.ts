import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { createTransport, Transporter } from 'nodemailer';
import { EmailI } from 'src/mail/domain/entities/email.interface';
import { EmailRepositoryI } from 'src/mail/domain/repository/emailRepository';
import { configService } from 'src/shared/dto';

@Injectable()
export class NodeMailerImp implements EmailRepositoryI {
  private readonly userEmail = configService.get('emailUser');
  private readonly userPass = configService.get('emailPass');
  async createSender(): Promise<Transporter> {
    try {
      const transport = await createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: this.userEmail,
          pass: this.userPass,
        },
      });
      return transport;
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      });
    }
  }

  async sendMail(email: EmailI): Promise<void> {
    try {
      const transporter = await this.createSender();
      const info = await transporter.sendMail({
        from: 'Terrariums-org <' + this.userEmail + '>',
        to: email.to,
        subject: email.subject,
        text: email.body,
      });
      console.log('messageId: ' + info.messageId);
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      });
    }
  }
}
