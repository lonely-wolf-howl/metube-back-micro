import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;

    const decryptedEmail = this.decrypt(headers.email);
    const decryptedDisplayName = this.decrypt(headers.displayname);

    if (!decryptedEmail || !decryptedDisplayName) {
      throw new UnauthorizedException();
    }

    headers.email = decryptedEmail;
    headers.displayname = decryptedDisplayName;

    return true;
  }

  decrypt(encryptedData: string) {
    const key = CryptoJS.enc.Utf8.parse(process.env.SECRET_KEY);
    const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
