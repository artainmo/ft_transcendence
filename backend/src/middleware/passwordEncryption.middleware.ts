import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');

@Injectable()
export class channelPasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if ((req.method !== 'GET' && req.method !== 'DELETE') && req.body.type === 'password' && req.body.password.length <= 20) { //Non-encrypted passwords have to be of size less than 20 and encrypted passwords are always of size greater than 20
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = encryptedPassword;
    }
    next();
  }
}
