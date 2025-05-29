import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { BaseService } from '../base.service'
import { LoggerService } from '../logger/custom.logger'
import {CreateUserDto} from "./dto/create-user.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository, logger: LoggerService) {
    super(repository, logger)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email })
  }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers()
  }


  async register(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      firstName,
      lastName,
      password,
      isActive,
    } = createUserDto;

    // Create new user entity instance
    const user = this.repository.create({
      email,
      firstName,
      lastName,
      password: password,
      isActive,
    });

    // Save user to the database
    return this.repository.save(user);
  }

}
