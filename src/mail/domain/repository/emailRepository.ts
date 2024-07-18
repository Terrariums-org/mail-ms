import { EmailI } from '../entities/email.interface';

export interface EmailRepositoryI {
  createSender(): Promise<any>;
  sendMail(email: EmailI): Promise<void>;
}
