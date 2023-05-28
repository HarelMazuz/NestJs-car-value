import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(emaiL: string, password: string) {
    //see if email is in use
    const isAlreadyExists = await this.usersService.find(emaiL); //***returns an array with something or empty
    if (isAlreadyExists.length) {
      throw new BadRequestException('email in use');
    }
    // hash the user password
    const salt = randomBytes(8).toString('hex');
    //***randomBytes returns a buffer(like an array with binary numbers) with 16 charcters(8*2 for each bite) and toString converts it to a string of 'hex' means numbers and letters.
    const hash = (await scrypt(password, salt, 32)) as Buffer; //***as Bufer helps typeScript recognize the type elsewhere its unknown and we don't want it
    const result = salt + '.' + hash.toString('hex');
    //create new user and save it
    const user = await this.usersService.create(emaiL, result);
    //return the user
    return user;
  }
  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('wrong email or password');
    }
    //password check
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('wrong email or password');
    return user;
  }
}
