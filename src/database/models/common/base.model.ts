import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;
  readonly created_at: string;
}
