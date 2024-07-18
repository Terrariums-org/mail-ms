import { IsString } from 'class-validator';
import { EmailI } from '../entities/email.interface';

export class EmailDTO implements EmailI {
  @IsString()
  to: string;
  @IsString()
  subject: string;
  @IsString()
  body: string;
}
