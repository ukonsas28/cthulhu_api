import { Inject, Injectable } from '@nestjs/common';
import { UsersModel } from '../../database/models/users/users.model';
import { ModelClass } from 'objection';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersModel') private readonly UsersModel: ModelClass<UsersModel>,
  ) {}

  async getUsersList(): Promise<UsersModel[]> {
    const usersList = await this.UsersModel.query().select('*');
    return usersList;
  }

  async getUserById(id: number): Promise<UsersModel> {
    const [oneUser] = await this.UsersModel.query().select('*').where('id', id);
    return oneUser;
  }
}
