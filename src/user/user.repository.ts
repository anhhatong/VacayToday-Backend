//user.repository.ts
import { EntityRepository, Entity } from '@mikro-orm/core';
import { User } from './entities/user.entity';

@Entity({ customRepository: () => User })
export class UserRepository extends EntityRepository<User> {}
