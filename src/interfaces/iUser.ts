import { ICompany } from './icompany';

export interface IUser {
  email: string;
  password: string;
  company?: ICompany;
  //role
  //etc..
}
