import { Request } from 'express';

export interface IRequest extends Request {
  validate(rules?): any;
  user: any;
  userPermissions: any;
}
