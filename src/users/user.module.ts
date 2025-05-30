import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
  ],
  providers: [],
  exports: [
    TypeOrmModule,
  ],
})
export class UserModule {
}
