import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');

//Cleaner method would be to encrypt a password in appropriate entity @BeforeInsert function...

@Injectable()
export class channelPasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if ((req.method !== 'GET' && req.method !== 'DELETE')
        && req.body.hasOwnProperty("type") && req.body.type === 'password'
        && req.body.hasOwnProperty("password") && req.body.password.length <= 20) { //Non-encrypted passwords have to be of size less than 20 and encrypted passwords are always of size greater than 20
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = encryptedPassword;
    }
    next();
  }
}

@Injectable()
export class userPasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if ((req.method !== 'GET' && req.method !== 'DELETE')
        && req.body.hasOwnProperty("password") && req.body.password !== ''
        && req.body.password.length <= 20) { //Non-encrypted passwords have to be of size less than 20 and encrypted passwords are always of size greater than 20
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = encryptedPassword;
    }
    next();
  }
}
