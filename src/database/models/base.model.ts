import { Model } from 'objection';

export class BaseModel extends Model {
  id: number;
  created_at: string;
  deleted_at: string;
  updated_at: string;
}
