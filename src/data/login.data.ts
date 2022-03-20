import { IUser } from '../../src/interfaces/iUser';
//These are some basic examples how would I create "DTOs" to transfer info around.
// between the API/SQL queries used to prep/cleanup test data for our E2E tests in the DB.
//The data itself could come from an external source, but the interface is needed.
//This prep/cleanup should be one in before/after hooks.

export const validUser: IUser = {
  email: 'valid.user@miti.com',
  password: 'validUserPassw0rd',
  company: {
    name: 'Valid Inc.'
  }
} as const;

export const invalidUser: IUser = {
  email: 'invalid.user@miti.com',
  password: 'whateverPassw0rd',
  company: {
    name: 'Invalid Inc.'
  }
};

export const lockedUser: IUser = {
  email: 'locked.user@miti.com',
  password: 'lockedUserPassw0rd',
  company: {
    name: 'Locked Inc.'
  }
} as const;
